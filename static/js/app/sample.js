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
			},
			function () {
				throw {name: 'AudioDecode', message: 'Error decoding ' + this.name};
			});
	};

	play = function (when) {
        // Creates, fills and connects a source, then plays it 
        console.log(this.buffer);
		var source, start;
        when = when !== null ? when : 0;
        
        source = audioContext.context.createBufferSource();
		source.buffer = this.buffer;
		source.connect(audioContext.context.destination);
		source.playbackRate.value = 0;
       
        // `noteOn` deprecated, try `start` first
        if(source.noteOn) {
            source.noteOn(when);

        } else {
            source.play(when);
        }
	};

	prototype = Object.create({}, {
        // The prototype for sample objects
		load: {value: load},
		onLoad: {value: onLoad},
		play: {value: play}
	});

	create = function (name, url, bytes) {
        // Factory 
		var sample = Object.create(
			prototype, {
				name: {value: name},
				bytes: {value: bytes},
				url: {value: url},
				samples: {value: null}
		});
		sample.load();
		return sample;
	};

    // Just the factory is public
	return {
		create : create
	};
});
