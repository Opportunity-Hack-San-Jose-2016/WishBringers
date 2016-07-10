
angular.module('app').factory('WishesService', function() {
   var wishlist = {
		"_id": {
			"$oid": "57217aedc80eb63ef26cdd8a"
		},
		"name": "wishes",
		"data": [{
			"wishid": "1",
			"desc": "toy",
			"image": "",
			"name": "sona",
			"age": 2
		}, {
			"wishid": "2",
			"desc": "toy",
			"image": "",
			"name": "kona",
			"age": 5
		}, {
			"wishid": "3",
			"desc": "piyu",
			"image": "",
			"name": "sona",
			"age": 6
		}, {
			"wishid": "4",
			"desc": "toy",
			"image": "",
			"name": "kita",
			"age": 3
		}, {
			"wishid": "1",
			"desc": "toy",
			"image": "",
			"name": "sona",
			"age": 2
		}, {
			"wishid": "1",
			"desc": "toy",
			"image": "",
			"name": "sona",
			"age": 2
		}]
	};
 
   return wishlist;
});