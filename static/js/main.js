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

	var mp3s = {}, plusone;

	// Iterate over manifest and instantiate mp3s
	manifest.mp3.forEach(function (mp3) {
		mp3s[mp3.name] = sample.create(mp3.name, mp3.url, mp3.bytes);
	});

	// A simple function to get jasmine up and running
	plusone = function (num) {
		return num + 1;
	};

	// Todo: implement requirejs in Node
	if(typeof exports !== 'undefined') {
		// Export for node.js
		exports.plusone = plusone;
	}
});