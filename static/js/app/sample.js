/*jslint nomen:true, white:true */
/*global requirejs, define, console, XMLHttpRequest */

"use strict";

define(['app/audiocontext'], function (audioContext) {

	var load, onLoad, play, prototype, create;


	load = function () {
		var request = new XMLHttpRequest();
		request.open('GET', this.url, true);
		request.responseType = 'arraybuffer';
		request.onload = this.onLoad.bind(this);
		request.send();
	};

	onLoad = function (e) {
		
		var 
		sample = this,
		request = e.target;

		audioContext.context.decodeAudioData(
			request.response,
			function (buffer) {
				sample.buffer = buffer;
				sample.play();
			},
			function () {
				throw {name: 'AudioDecode', message: 'Error decoding ' + this.name};
			});
	};

	play = function () {

		var source = audioContext.context.createBufferSource();
		source.buffer = this.buffer;
		source.connect(audioContext.context.destination);
		source.playbackRate.value = 0;
		source.noteOn(0);
	};

	prototype = Object.create({}, {
		load: {value: load},
		onLoad: {value: onLoad},
		play: {value: play}
	});

	create = function (name, url, bytes) {

		var sample = Object.create(
			prototype, {
				name: {value: name},
				bytes: {value: bytes},
				url: {value: url},
				samples: {value:null}
		});

		sample.load();

		return sample;
	};

	return {
		create : create
	};
});
