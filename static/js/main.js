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

	var mp3s = {};

	// Iterate over manifest and instantiate mp3s
	manifest.mp3.forEach(function (mp3) {
		mp3s[mp3.name] = sample.create(mp3.name, mp3.url, mp3.bytes);
	});

});