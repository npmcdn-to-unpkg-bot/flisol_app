//Controladores de la aplicacion
var app = angular.module('comic.controllers',[]);

app.controller('comicController',['$scope','comicsServices', function($scope, comicsServices){
  comicsServices.getAll()
    .then(function(response){
      $scope.data = response;
    });
}])

.controller('infoController',['$scope', '$routeParams','comicsServices', function($scope, $routeParams, comicsServices){
  var id = $routeParams.id;
  $scope.comic = {};
  comicsServices.getComic(id).then(function(data){
    $scope.comic = data;
  });
}]);
