'use strict'

//=============================================Nav====================================================== 

var ctrls = angular.module( 'ctrls', [ 'ngRoute' ] );

ctrls.controller( 'NavigationCtrl', [ '$scope', '$location', 'cartSrv', function( $scope, $location, cartSrv ) {
    $scope.getNavigation = function () {
        if ( $location.path().substring(0, 6) == "/admin" ) {
            return 'partials/admin/navigation.html';
        } else {
            return 'partials/site/navigation.html'; 
        }
    }

    $scope.isActive = function ( path ) {
        return $location.path() === path;
    };

    $scope.$watch( function () {
        $scope.cart = cartSrv.show().length;
    });
}]);

//==========================================Admin Products============================================== 

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

//==========================================Admin Users=================================================

ctrls.controller( 'UsersCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/users.json' ).
    success( function( data ) {
        $scope.users = data;
    }).error( function() {
        console.log('Błąd pobierania pliku users.json');
    });
    $scope.deleteUser = function ( user, index ) {

        $scope.users.splice( index, 1 );
    };
}]);

ctrls.controller( 'EditUserCtrl', [ '$scope', '$http', '$routeParams', function( $scope, $http, $routeParams ) {
    $http.get( 'model/users.json' ).
    success( function( data ) {
        $scope.user = data[$routeParams.id];
    }).error( function() {
        console.log('Błąd pobierania pliku users.json');
    });

    $scope.saveChanges = function ( user ) {

        console.log( user );
        console.log( 'Formularz przesłany' );
    };
}]);

ctrls.controller( 'AddUserCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $scope.addUser = function () {

        console.log( $scope.user );
    };
}]);

//==========================================Admin Orders================================================

ctrls.controller( 'OrdersCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'model/orders.json' ).
    success( function( data ) {
        $scope.orders = data;
    }).error( function() {
        console.log('Błąd pobierania pliku orders.json');
    });

    $scope.changeStatus = function ( order ) {

        if ( order.status == 0 ) {
            order.status = 1;
        } else {
            order.status = 0;
        }
    };

    $scope.deleteOrder = function ( order, index ) {

        $scope.orders.splice( order, 1 );
    };
}]);



//===========================================Site Products================================================

ctrls.controller( 'SiteProductsCtrl', [ '$scope', '$http', 'cartSrv', function( $scope, $http, cartSrv ) {
    $http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.products = data;
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });

    $scope.addToCart = function ( product ) {
        cartSrv.addProduct( product );
    };
}]);

ctrls.controller( 'SiteProductCtrl', [ '$scope', '$http', '$routeParams', 'cartSrv',  function( $scope, $http, $routeParams, cartSrv ) {
    $http.get( 'model/products.json' ).
    success( function( data ) {
        $scope.product = data[ $routeParams.id ];
    }).error( function() {
        console.log('Błąd pobierania pliku products.json');
    });

    $scope.addToCart = function ( product ) {
        cartSrv.addProduct( product );
    };
}]);

//===========================================Site Cart===================================================

ctrls.controller( 'CartCtrl', [ '$scope', '$filter', 'cartSrv', function( $scope, $filter, cartSrv ) {
    $scope.cart = cartSrv.show();

    $scope.clearCart = function () {
        cartSrv.clear();
    };

    $scope.getTotal = function () {
        var total = 0;

        angular.forEach( $scope.cart, function ( item ) {
            total += item.price * item.quantity;
        });

        return $filter( 'number' )(total, 2);
    }

    $scope.removeProduct = function ( index ) {
        cartSrv.removeProduct ( index );
    };

    $scope.setOrder = function ( $event, paypalFormValid ) {
        if ( !paypalFormValid ) {
            $event.preventDefault();
        }

        // TODO: check if user is logged in 
        var loggedIn = true;

        if ( !loggedIn ) {
            $scope.alert = { type : 'warning', msg : 'Musisz sie zalogować aby złożyć zamówienie' };
            $event.preventDefault();
            return false;
        }

        // TODO: store the order in the database

        console.log( $scope.getTotal() );
        console.log( $scope.cart );

        $scope.alert = { type : 'success', msg : 'Trwa przekierowywanie do płatności, nie odswirzaj strony' };
        cartSrv.clear();

        $event.preventDefault(); // temp

        // TODO: send the form after that logic 
    };

    $scope.$watch( function () {
        cartSrv.update( $scope.cart );
    });
}]);