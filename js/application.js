'use strict'

var app = angular.module( 'app', [ 'ngRoute', 'ctrls' ] );

app.config( [ '$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider ) {  
    $routeProvider.when( '/products', {
        controller : 'ProductsCtrl',
        templateUrl : 'partials/products.html'
    });

    $routeProvider.when( '/product/edit/:id', {
        controller : 'EditProductCtrl',
        templateUrl : 'partials/product-edit.html'
    });

    $routeProvider.when( '/product/add', {
        controller : 'AddProductCtrl',
        templateUrl : 'partials/product-add.html'
    });

    $routeProvider.when( '/users', {
        controller : 'UsersCtrl',
        templateUrl : 'partials/users.html'
    });

    $routeProvider.otherwise({
        redirectTo : "/home"
    });
}]);