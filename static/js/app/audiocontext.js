define(function () {

	var context;

	try {
		context = new window.webkitAudioContext();
	} catch (e) {
		console.error('Unbale to instantiate audio context');
	}
	return {
		context: context
	}
});