/*jslint nomen:true, white:true */
/*global window, console, XMLHttpRequest */

(function () {

	"use strict";

	var 
	onWindowLoad,
	context, loadAudio, playAudio,
	audioUrl = 'audio/sound.wav', // Doesn't like the AIFF codec, convert this
	buffer=null;

	// Load audio
	loadAudio = function () {
		var request;

		request = new XMLHttpRequest();
		request.open('GET', audioUrl, true);
		request.responseType = 'arraybuffer';
		
		request.onload = function() {
			context.decodeAudioData(
				request.response, function (_buffer) {
					buffer = _buffer;
					console.log('loaded');
					playAudio(_buffer);
				},
				function () {
					console.error('Error decoding audio');
				});
		};
		request.send();
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
			loadAudio(context);
		}
	};

	window.addEventListener('load', onWindowLoad, false);

}());