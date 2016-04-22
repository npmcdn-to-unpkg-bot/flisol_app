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
  comicsServices.getComic(id).then(function(data){
    $scope.comic = data;
  });;
}])

//services para la app
.factory('comicsServices',['$q','$http','$window', function($q,$http, $window){
  var localStorage = $window.localStorage;
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

  function saveComment(id, comment){
    var comments = getComments(id);
    comments.push(comment);
    localStorage.setItem(id, JSON.stringify(comments));
  }

  function getComments(id){
    var comments = localStorage.getItem(id);
    if(!comments){
      comments=[];
    }else{
      comments = JSON.parse(comments);
    }
    return comments;
  }

  return {
    getAll : getAll,
    getComic : getComic,
    saveComment : saveComment,
    getComments : getComments
  };
}])


//directivas de la aplicacion
.directive('blockDescription', function(){
    return{
        restrict : 'E',
        templateUrl: 'partials/block-description.html'
    };
})

.directive('blockComments', ['comicsServices',function(comicsServices){
    return{
        restrict: 'E',
        templateUrl: 'partials/block-comments.html',
        scope:{ id : '@id'},
        link: function(scope, element, attributes){
          attributes.$observe('id', function(value){
            if(value){
              scope.id = value;
              scope.comments = comicsServices.getComments(value);
            }
          });
        },
        controller: function($scope){
          $scope.comment = {};
          $scope.comments = comicsServices.getComments($scope.id);
          $scope.addComment = function(){
            $scope.comment.date = Date.now();
            comicsServices.saveComment($scope.id, $scope.comment);
            $scope.comments = comicsServices.getComments($scope.id);
            $scope.comment = {};
          };
        }
    };
}])
