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
.controller('comicController',['$scope', '$http', function($scope, $http){
    $scope.comic = {
        "id": "001",
        "name": "Deadpool",
        "price": "14.00",
        "description": "Esta es la descripción de el comic de Deadpool",
        "thumbnail": "deadpool.jpg"
    };

    $http.get('../comics.json')
      .success(function(data){
        console.log(data);
        $scope.data= data;
      }).error(function(error){
        console.log(error);
      });
}])

.controller('infoController',['$scope', '$routeParams', function($scope, $routeParams){
  $scope.name = $routeParams.name;
}])
