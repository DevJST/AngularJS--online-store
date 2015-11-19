'use strict'

var ctrls = angular.module( 'ctrls', [ 'ngRoute' ] );

ctrls.controller( 'NavigationCtrl', [ '$scope', '$location', function( $scope, $location ) {
    $scope.isActive = function ( path ) {
        return $location.path() === path;
    };
}]);

ctrls.controller( 'ProductsCtrl' , [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.products = data;
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });

    $scope.deleteProduct = function ( product, index ) {

    	$scope.products.splice( index, 1 );
    };
}]);

ctrls.controller( 'EditProductCtrl', [ '$scope', '$http', '$routeParams', function( $scope, $http, $routeParams ) {
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

ctrls.controller( 'AddProductCtrl', [ '$scope', '$http', function( $scope, $http ) {
	$scope.addProduct = function () {

    	console.log( $scope.product );
    };
}]);

ctrls.controller( 'UsersCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/users.json' ).
    success( function( data ) {
        $scope.users = data;
    }).error( function() {
        console.log('Błąd pobierania pliku users.json');
    });
}]);