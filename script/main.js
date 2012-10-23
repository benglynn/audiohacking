/*jslint nomen:true, white:true */
/*global window, console, XMLHttpRequest */

(function () {

	"use strict";

	var 
	onWindowLoad,
	context, loadSamples, onSampleload, playAudio,
	urls = ['audio/bd.mp3', 'audio/sn.mp3', 'audio/clp.mp3'],
	samples = [];

	onSampleload = function(e) {
		var request = e.target;
		context.decodeAudioData(
			request.response, function (buffer) {
				playAudio(buffer);
			},
			function () {
				console.error('Error decoding audio');
			});
	};


	loadSamples = function () {
		urls.forEach(function (url, i) {

			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';
			request.onload = onSampleload;
			request.send();
		});
	};


	playAudio = function (buffer) {
		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.playbackRate.value = 0;
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
			loadSamples(context);
		}
	};

	window.addEventListener('load', onWindowLoad, false);

}());