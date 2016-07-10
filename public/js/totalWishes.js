var appVar = angular.module('app', []);

appVar.controller('TotalWishesController', function($scope,$window) {
	
	$scope.wishlist = JSON.parse($window.localStorage['wishes'] || '{}');
	$scope.total = 0;
	$scope.length = $scope.wishlist.length;
	for(var i = 0; i<$scope.wishlist.length;i++)
		{
		$scope.total = $scope.total+$scope.wishlist[0].price;
		}
	
});