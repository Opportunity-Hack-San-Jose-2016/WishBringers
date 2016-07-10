var appVar = angular.module('app', []);

appVar.controller('PaymentController', function($scope,$window) {
	$('form').card({
	    container: '.card-wrapper',
	    width: 280,

	    formSelectors: {
	        nameInput: 'input[name="first-name"], input[name="last-name"]'
	    }
	});
	
	
});


/* Card.js plugin by Jesse Pollak. https://github.com/jessepollak/card */

