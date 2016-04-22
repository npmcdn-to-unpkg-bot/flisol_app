var app = angular.module('appFlisol', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider){ //esta es la configuración de el router
  $routeProvider
    .when('/',{
      templateUrl: 'views/comics.html',
      controller: 'comicController'
    })
    .when('/comic/:id', {
      templateUrl: 'views/comic-info.html',
      controller: 'infoController'
    })
    .otherwise({
        redirectTo: '/'
      });
}])
//Controladores de la aplicacion
.controller('comicController',['$scope','comicsServices', function($scope, comicsServices){
  comicsServices.getAll()
    .then(function(response){
      $scope.data = response;
    });
}])

.controller('infoController',['$scope', '$routeParams','comicsServices', function($scope, $routeParams, comicsServices){
  var id = $routeParams.id;
  $scope.comic = {};
  console.log(id);
  comicsServices.getComic(id).then(function(data){
    $scope.comic = data;
  });
}])

//services para la app
.factory('comicsServices',['$q','$http', function($q,$http){
  function getAll(){
    var deferred = $q.defer();
    $http.get('../comics.json')
      .success(function(data){
        deferred.resolve(data);
      }).error(function(error){
        deferred.reject();
      });
    return deferred.promise;
  }

  function getComic(id){
    var deferred = $q.defer();
    getAll().then(function(data){
      var results = data.filter(function(comic){
        return comic.id === id;
      });
      if(results.length > 0){
        deferred.resolve(results[0]);
      }else{
        deferred.reject();
      }
    });
    return deferred.promise;
  }

  return {
    getAll : getAll,
    getComic : getComic
  };
}])


//directivas de la aplicacion
.directive('blockDescription', function(){
    return{
        restrict : 'E',
        templateUrl: 'partials/block-description.html'
    };
})

.directive('blockComments', function(){
    return{
        restrict: 'E',
        templateUrl: 'partials/block-comments.html'
    };
})
