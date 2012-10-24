/*jslint nomen:true, white:true */
/*global window, console, XMLHttpRequest */

var root = this;

(function () {

	"use strict";

	var 
	root = this,
	onWindowLoad,
	context, loadSamples, onSampleLoad, playAudio,
	plusone,
	urls = ['static/mp3/bd.mp3', 'static/mp3/sn.mp3', 'static/mp3/clp.mp3'],
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


	loadSamples = function () {
		urls.forEach(function (url, i) {

			var request = new XMLHttpRequest();
			request.open('GET', url, true);
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

	onWindowLoad = function () {
		try {
			context = new window.webkitAudioContext();
		} catch (e) {
			console.error('Unbale to instantiate audio context');
		}
		if (context) {
			loadSamples(context);
		}
	};

	if(typeof exports === 'undefined') {
		window.addEventListener('load', onWindowLoad, false);
	} else {
		// Export for node.js
		exports.plusone = plusone;
	}
}());