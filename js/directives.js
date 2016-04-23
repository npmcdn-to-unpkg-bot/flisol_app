//directivas de la aplicacion
var app = angular.module('comic.directives',[]);
app.directive('blockDescription', function(){
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
}]);
