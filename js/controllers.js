'use strict'

var ctrls = angular.module( 'ctrls', [ 'ngRoute' ] );

ctrls.controller( 'products' , [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.products = data;
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });
}]);

ctrls.controller( 'editProductCtrl', [ '$scope', '$http', '$routeParams', function( $scope, $http, $routeParams ) {
	$http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.product = data[$routeParams.id];
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });

    $scope.saveChanges = function ( product ) {

    	console.log( product );
    	console.log( 'Formularz przesłany' );
    };
}]);

ctrls.controller( 'addProductCtrl', [ '$scope', '$http', function( $scope, $http ) {
	$scope.addProduct = function () {

    	console.log( $scope.product );
    };
}]);