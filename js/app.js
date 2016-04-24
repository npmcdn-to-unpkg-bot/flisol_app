var app = angular.module('appFlisol', ['ngRoute', 'comic.controllers', 'comic.services', 'comic.directives']);


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
}]);
