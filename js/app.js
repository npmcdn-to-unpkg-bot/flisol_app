var app = angular.module('appFlisol', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider){ //esta es la configuración de el roter
  $routeProvider
    .when('/',{
      templateUrl: 'views/comics.html',
      controller: 'comicController'
    })
    .when('/comic/:name', {
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

.controller('infoController',['$scope', '$routeParams', function($scope, $routeParams){
  $scope.name = $routeParams.name;
}])

//services para la app
.factory('comicsServices',['$q','$http', function($q,$http){
  function getAll(){
    var deferred = $q.defer();
    $http.get('../comics.json')
      .success(function(data){
        deferred.resolve(data);
      }).error(function(error){
        deferred.reject(error);
      });
    return deferred.promise;
  }
  return {
    getAll : getAll
  };
}])
