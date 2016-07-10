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
    this.uploadFileToUrl = function(file, uploadUrl){
       var fd = new FormData();
       fd.append('file', file);
    
       var request = {
               method: 'POST',
               url: uploadUrl,
               data: {"fd" : fd,'date':'123'},
               headers: {
                   'Content-Type': undefined
               }
           };
       
       // SEND THE FILES.
       $http(request)
           .success(function (d) {
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
    $scope.uploadFile = function(){
       var file = $scope.csvFile;
       
       console.log('file is ' );
       console.dir(file);
       
       var uploadUrl = "/InsertWishes";
       fileUpload.uploadFileToUrl(file, uploadUrl);
    };
 }]);