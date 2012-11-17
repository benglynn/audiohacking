/*jslint nomen:true, white:true */
/*global requirejs, window, console, XMLHttpRequest */

"use strict";

requirejs.config({
	baseUrl: 'js',
	paths: {
		app: 'app'
	}
});

requirejs(['app/sample', 'app/manifest'], function (sample, manifest) {

	var samples = {};

	// Iterate over manifest and instantiate mp3s
	manifest.mp3.forEach(function (mp3) {
		samples[mp3.name] = sample.create(mp3.name, mp3.url, mp3.bytes);
	});

    // Clumsy in lieu of load listener
    setTimeout(function () {
        samples.bd.play(0);
        samples.sn.play(0.25);
        samples.clp.play(0.5);
        samples.sn.play(0.75);
        samples.bd.play(1);
    }, 250);
});
