(function () {

	// A simple function to get jasmine up and running
	plusone = function (num) {
		return num + 1;
	};

	// Todo: implement requirejs in Node
	if(typeof exports !== 'undefined') {
		// Export for node.js
		exports.plusone = plusone;
	}
}());