var plusone = require('../static/js/main.js').plusone;

describe('plusone', function() {
	it('adds one to a number', function() {
		expect(plusone(1)).toEqual(2);
	});
});
