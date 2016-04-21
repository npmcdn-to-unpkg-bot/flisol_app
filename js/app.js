var app = angular.module('appFlisol', []);


app.controller('comicController',[function(){
    this.comic = {
        "id": "001",
        "name": "Deadpool",
        "price": "14.00",
        "description": "Esta es la descripción de el comic de Deadpool",
        "thumbnail": "deadpool.jpg"
    };
}])
