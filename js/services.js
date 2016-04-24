//services de la aplicación

var app = angular.module('comic.services',[]);

app.factory('comicsServices',['$q','$http','$window', function($q,$http, $window){
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
}]);
