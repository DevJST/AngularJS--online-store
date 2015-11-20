'use strict'

var app = angular.module( 'app', [ 'ngRoute', 'ctrls' ] );

app.config( [ '$routeProvider', '$httpProvider', function( $routeProvider, $httpProvider ) {  
    
    //====================Admin Products========================                             

    $routeProvider.when( '/admin/products', {
        controller : 'ProductsCtrl',
        templateUrl : 'partials/admin/products.html'
    });

    $routeProvider.when( '/admin/product/edit/:id', {
        controller : 'EditProductCtrl',
        templateUrl : 'partials/admin/product-edit.html'
    });

    $routeProvider.when( '/admin/product/add', {
        controller : 'AddProductCtrl',
        templateUrl : 'partials/admin/product-add.html'
    });

    //====================Admin Users===========================                             

    $routeProvider.when( '/admin/users', {
        controller : 'UsersCtrl',
        templateUrl : 'partials/admin/users.html'
    });

    $routeProvider.when( '/admin/user/edit/:id', {
        controller : 'EditUserCtrl',
        templateUrl : 'partials/admin/user-edit.html'
    });

    $routeProvider.when( '/admin/user/add', {
        controller : 'AddUserCtrl',
        templateUrl : 'partials/admin/user-add.html'
    });

    //====================Admin Orders===========================                             

    $routeProvider.when( '/admin/orders', {
        controller : 'OrdersCtrl',
        templateUrl : 'partials/admin/orders.html'
    });

    //====================Site Products==========================                             

    $routeProvider.when( '/products', {
        controller : 'SiteProductsCtrl',
        templateUrl : 'partials/site/products.html'
    });

    $routeProvider.when( '/product/:id', {
        controller : 'SiteProductCtrl',
        templateUrl : 'partials/site/product.html'
    });

    //==================Default========================= 

    $routeProvider.otherwise({
        redirectTo : "/home"
    });
}]);