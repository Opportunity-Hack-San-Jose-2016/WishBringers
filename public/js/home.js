var appVar = angular.module('app', [ "ngRoute"]);

appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'WishesController',
		templateUrl : '/templates/wishes.ejs'
	}).otherwise({
		controller : 'WishesController',
		templateUrl : '/templates/wishes.ejs'
	});
	
	
} ]);

appVar.controller('WishesController', function($scope, $http) {
//uncomment this code when you write backend code	
//	 $http({
//	 		method : "GET",
//	 		url : "/getWishes",
//	 		
//	 	}).success(function (res) {
//	 		console.log("The return value: "+JSON.stringify(res));
//	 		$scope.wishes = res.wishes;
//	 	});
	 
	$scope.items = [];
	$scope.status = "Add to Cart";
	$scope.class = "btn btn-primary";
	$scope.wishes = {
		"_id": {
			"$oid": "57217aedc80eb63ef26cdd8a"
		},
		"name": "wishes",
		"data": [{
			"wishid": "1",
			"Description": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/5934.jpg",
			"FirstName": "sona",
			"CardAge": 2,
			"Price" :"$26"
		}, {
			"wishid": "2",
			"desc": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/40.jpg",
			"FirstName": "kona",
			"CardAge": 5,
			"Price" :"$26"
		}, {
			"wishid": "3",
			"Description": "piyu",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/6407.jpg",
			"FirstName": "sona",
			"CardAge": 6,
			"Price" :"$26"
		}, {
			"wishid": "4",
			"Description": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/1792.jpg",
			"FirstName": "kita",
			"CardAge": 3,
			"Price" :"$26"
		}, {
			"wishid": "1",
			"Description": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/6233.jpg",
			"FirstName": "sona",
			"CardAge": 2,
			"Price" :"$26"
		}, {
			"wishid": "1",
			"Description": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/5934.jpg",
			"FirstName": "sona",
			"CardAge": 2,
			"Price" :"$26"
		}, {
			"wishid": "1",
			"Description": "toy",
			"ImageURL": "http://fgt.netqnet.com/GiftImages/5934.jpg",
			"FirstName": "sona",
			"CardAge": 2,
			"Price" :"$26"
		}]
};
	for (var i = 0; i < $scope.wishes.data.length; i++) {
		$scope.items.push($scope.wishes.data[i])
	}
	
	$scope.addToCart = function($index){
		console.log("index......."+$index);
		if($scope.status == 'Add to Cart')
			{
			$scope.status = "Remove from Cart"
			$scope.class = "btn btn-danger";
			}
		else {
			$scope.status = "Add to Cart"
			$scope.class = "btn btn-primary";
				
		}
		
		var name = $scope.items[$index].FirstName;
		var price = $scope.items[$index].Price;
		console.log("name: "+name+" price "+price);
		
	}
	
});


