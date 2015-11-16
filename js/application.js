'use strict'

var app = angular.module( 'app', [ 'ngRoute' ] );

app.config( [ '$routeProvider', function( $routeProvider ) {
    
}]);

app.controller( 'products' , [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.products = data;
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });
}]);