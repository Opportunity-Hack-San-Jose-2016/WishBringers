var appVar = angular.module('app', [ "ngRoute","rzModule","elasticsearch"]);
var index = 'wishlist1';
var type = 'logs'


appVar.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		controller : 'WishesController',
		templateUrl : '/templates/wishes.ejs'
	}).otherwise({
		controller : 'WishesController',
		templateUrl : '/templates/wishes.ejs'
	});
	
	
} ]);

appVar.service('client', function (esFactory) {
    return esFactory({
      host: 'https://b054df0d.ngrok.io',
      apiVersion: '2.3',
      log: 'trace'
    });
  });
appVar.controller('WishesController', function($scope, $http,$rootScope,$window,client) {
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
	$rootScope.wishesCount=0;
	$rootScope.cartProducts = [];
	
	$scope.slider = {
			  minValue: 1,
			  maxValue: 1000,
			  options: {
			   
			    draggableRange: true
			  }
			};
	
	$scope.onSlider = function(){
		 client.search({
			  index: index,
			  type: type,
			  body: {
			    query: { 
			  		    "constant_score" : {
			  		        "filter" : {
			  		            "range" : {
			  		                "price" : {
			  		                    "gte": minValue,
			  		                    "lt": maxValue
			  		                }
			  		            }
			  		        }
			  		    }
			    }
			  }
			}).then(function (resp) {
			    var hits = resp.hits.hits;
			    console.log(hits);
			}, function (err) {
			    console.trace(err.message);
			});
	}
	
	$scope.onCheckSearch = function(bool,range){
		var limit1=0;
		var limit2=100;
		
		if(bool==true && range=="0-5"){
			limit1=0;limit2=5;
		}
		else if(bool==true && range=="5-10")
		{
			limit2=10
		}
		else if(bool==true && range=="11-15")
		{
			limit3=15
		}
		

		 client.search({
			  index: index,
			  type: type,
			  body: {
			    query: { 
			  		    "constant_score" : {
			  		        "filter" : {
			  		            "range" : {
			  		                "child_age" : {
			  		                    "gte": limit1,
			  		                    "lt": limit2
			  		                }
			  		            }
			  		        }
			  		    }
			    }
			  }
			}).then(function (resp) {
			    var hits = resp.hits.hits;
			    console.log(hits);
			}, function (err) {
			    console.trace(err.message);
			});
	}

	 $scope.filterResults = function(gender){
		 client.search({
			  index: index,
			  type: type,
			  body: {
			    query: {
			      match: {
			        child_gender: gender
			      }
			    }
			  }
			}).then(function (resp) {
			    var hits = resp.hits.hits;
			    console.log(hits);
			}, function (err) {
			    console.trace(err.message);
			});
		 
			}
	 $scope.per_page = 12;
	    $scope.page = 0;

	    $scope.show_more = function () {
	        $scope.page += 1;
	        $scope.wishes($scope.page*$scope.per_page);
	    };
	 
	$scope.wishes = function(){
		 client.search({
			  index: index,
			  type: type,
			  body: {
				from : $scope.page,
				size : $scope.per_page,
			    query: {
			      "match_all": {}
			    }
			  }
			}).then(function (resp) {
			    var hits = resp.hits.hits;
			    console.log(hits);
			}, function (err) {
			    console.trace(err.message);
			});
	};
	 
	for (var i = 0; i < $scope.wishes.data.length; i++) {
		$scope.items.push($scope.wishes.data[i])
	}
	
	$scope.addToCart = function($index,status){
		
		if(status == false)
			{
			$rootScope.wishesCount = $rootScope.wishesCount+1;
			$rootScope.cartProducts.push({"name":$scope.items[$index].FirstName, "price":$scope.items[$index].Price,
				"age" : $scope.items[$index].CardAge, "url": $scope.items[$index].ImageURL});
			}
		else
			{
			$rootScope.wishesCount = $rootScope.wishesCount -1;
			$scope.removeItem($index);
			
			}
		
	}

	$scope.removeItem = function(index){
		$rootScope.cartProducts.splice(index, 1);
		  }
	
	$scope.saveInCache = function(){
		$window.localStorage.setItem('wishes', JSON.stringify($rootScope.cartProducts));
	}
	
});

appVar.controller('submitTransaction', function($scope){
	$scope.wishesBought = JSON.parse($window.localStorage['wishes'] || '{}');
	$http({
 		method : "POST",
 		url : "/insertData",
 		
 	}).success(function (res) {
 		console.log("The return value: "+JSON.stringify(res));
 		
 	});
	
	
})


