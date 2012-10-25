/*jslint nomen:true, white:true */
/*global window, console, XMLHttpRequest */

var root = this;

(function () {

	"use strict";

	var 
	MP3DIR = 'mp3',
	root = this,
	init,
	context, loadSamples, onSampleLoad, playAudio,
	plusone,
	samples = [];
	
	onSampleLoad = function(e) {
		var request = e.target;
		context.decodeAudioData(
			request.response, function (buffer) {
				playAudio(buffer);
			},
			function () {
				console.error('Error decoding audio');
			});
	};


	loadSamples = function (manifest, context) {
		Object.keys(manifest).forEach(function (name, i) {

			var request = new XMLHttpRequest();
			request.open('GET', MP3DIR + '/' + name, true);
			request.responseType = 'arraybuffer';
			request.onload = onSampleLoad;
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

	plusone = function (num) {
		return num + 1;
	};

	init = function () {

		var onManifestLoad;

		onManifestLoad = function (e) {
			loadSamples(JSON.parse(e.target.response), context);
		};

		try {
			context = new window.webkitAudioContext();
		} catch (e) {
			console.error('Unbale to instantiate audio context');
		}
		if (context) {
			// Load the mp3 manifest
			var request = new XMLHttpRequest();
			request.open('GET', MP3DIR + '/manifest.json', true);
			request.onload = onManifestLoad;
			request.send();
		}
	}();

	if(typeof exports !== 'undefined') {
		// Export for node.js
		exports.plusone = plusone;
	}
}());