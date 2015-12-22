'use strict'

var customServices = angular.module( 'customServices', [] );


customServices.factory( 'cartSrv', function () {
	var cart = []; 

    if ( localStorage.getItem( 'cart' ) ) {
        var cart = JSON.parse( localStorage.getItem( 'cart') );
    } else {
        var cart = [];
    }

	cart.getCart = function () {
        return cart;
	};

	cart.addProduct = function ( product ) {
        var whetherNewProduct = true;

        if ( !cart.length ) {
            product.quantity = 1;
            delete product[ 'productId' ];
            cart.push( product );

            whetherNewProduct = false;
        } else {
            angular.forEach ( cart, function ( value, key ) {
                if ( value.name == product.name ) {
                    cart[key].quantity++;
                    whetherNewProduct = false;
                }
            });
        }

        if ( whetherNewProduct ) {
            product.quantity = 1;
            delete product[ 'productId' ];
            cart.push( product );
        }

        localStorage.setItem( 'cart', JSON.stringify( cart ) );
	};

    cart.removeProduct = function ( index ) {
        
        cart.splice( index, 1);
        localStorage.setItem( 'cart', JSON.stringify( cart ) );
    };

    cart.update = function ( newCart ) {
        
        cart = newCart;
        localStorage.setItem( 'cart', JSON.stringify( cart ) );
    };

    cart.clear = function () {
        
        localStorage.removeItem( 'cart' );
        cart.length = 0;
    };

	return cart;
});

customServices.service( 'tokenHandling', [ 'jwtHelper', function ( jwtHelper ) {
    
    var token;
    var tokenPayload;

    this.loadToken = function () {
        token = JSON.parse( localStorage.getItem( "token" ) );

        if ( token ) {
            tokenPayload = jwtHelper.decodeToken( token );
        } else {
            tokenPayload = false;
        }
    } 
    this.loadToken();

    this.getToken = function () {
        //return angular.copy( token );
        return token;
    }

    this.loggedIn = function () {
        if ( tokenPayload ) {
            return true;
        } else {
            return false;
        }
    };

    this.isAdmin = function () {
        var isAdmin = false;

        if ( this.loggedIn() ) {
            if ( tokenPayload.role === 'admin' ) { isAdmin = true;  } 

        }
        return isAdmin;
    }

    this.clearToken = function () {
        localStorage.removeItem( "token" );
        this.loadToken();
    }
}]);