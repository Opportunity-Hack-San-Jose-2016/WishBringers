var app = angular.module('UploadWish', []);
app.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl,$scope){
       var fd = new FormData();
       fd.append('file', file);
       var request = {
               method: 'POST',
               url: uploadUrl,
               data: fd,
               headers: {
                   'Content-Type': undefined
               }
           };
       
       // SEND THE FILES.
       $http(request)
           .success(function (d) {
               $scope.showProgress=false;
               alert(d);
              
           })
           .error(function () {
           });
    /*   $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
       })
    
       .success(function(){
    	   
       })
    
       .error(function(){
       });*/
    }
 }]);

app.controller('UploadWishesController', ['$scope', 'fileUpload', function($scope, fileUpload){
    console.log($scope.showProgress);
	$scope.showProgress = false;
	$scope.uploadFile = function(){
       var file = $scope.csvFile;
       console.log($scope.showProgress);
       console.log('file is ' );
       console.dir(file);
       $scope.showProgress = true;
       var uploadUrl = "/InsertWishes";
       fileUpload.uploadFileToUrl(file, uploadUrl,$scope);
    };
 }]);