/*jslint nomen:true, white:true */
/*global window, console, XMLHttpRequest */

(function () {

	"use strict";

	var 
	onWindowLoad,
	context, loadBuffers, onBufferLoad, playAudio,
	names = ['bd', 'sn'],
	buffers = [];

	onBufferLoad = function(e) {
		var request = e.target;
		context.decodeAudioData(
			request.response, function (buffer) {
				playAudio(buffer);
			},
			function () {
				console.error('Error decoding audio');
			});
	};


	loadBuffers = function () {
		names.forEach(function (name, i) {

			var request, url = 'audio/' + name + '.mp3';
			
			request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = onBufferLoad;
			request.send();
		});
	};


	playAudio = function (buffer) {
		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.noteOn(0);
	};

	onWindowLoad = function () {
		// Get context and kick off
		try {
			context = new window.webkitAudioContext();
		} catch (e) {
			console.error('Unbale to instantiate audio context');
		}
		if (context) {
			loadBuffers(context);
		}
	};

	window.addEventListener('load', onWindowLoad, false);

}());