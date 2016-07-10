var appVar = angular.module('app', []);

appVar.controller('RegisterController', function($scope,$window) {
	$scope.registerUser = function(){
		
		$window.location.href = '/home/'+$scope.user.name;
		$window.localStorage.setItem('logourl', $scope.user.url);
		
	}
	
	
});
