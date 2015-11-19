'use strict'

var app = angular.module( 'app', [ 'ngRoute', 'ctrls' ] );

app.config( [ '$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider ) {  
    //==================Products======================                             

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

    //==================Users=========================                             

    $routeProvider.when( '/users', {
        controller : 'UsersCtrl',
        templateUrl : 'partials/users.html'
    });

    $routeProvider.when( '/user/edit/:id', {
        controller : 'EditUserCtrl',
        templateUrl : 'partials/user-edit.html'
    });

    $routeProvider.when( '/user/add', {
        controller : 'AddUserCtrl',
        templateUrl : 'partials/user-add.html'
    });

    //==================Orders=========================                             

    $routeProvider.when( '/orders', {
        controller : 'OrdersCtrl',
        templateUrl : 'partials/orders.html'
    });

    //==================Default========================= 

    $routeProvider.otherwise({
        redirectTo : "/home"
    });
}]);