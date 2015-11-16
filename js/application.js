'use strict'

var app = angular.module( 'app', [ 'ngRoute', 'ctrls' ] );

app.config( [ '$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider ) {  
    $routeProvider.when( '/products', {
        controller : 'products',
        templateUrl : 'partials/products.html'
    });

    $routeProvider.when( '/product/edit/:id', {
        controller : 'editProductCtrl',
        templateUrl : 'partials/product-edit.html'
    });

    $routeProvider.when( '/product/add', {
        controller : 'addProductCtrl',
        templateUrl : 'partials/product-add.html'
    });

    $routeProvider.otherwise({
        redirectTo : "/home"
    });
}]);