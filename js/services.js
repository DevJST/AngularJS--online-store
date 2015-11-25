'use strict'

var customServices = angular.module( 'customServices', [] );


customServices.factory( 'cartSrv', function () {
	var cart = []; 

    if ( localStorage.getItem( 'cart' ) ) {
        var cart = JSON.parse( localStorage.getItem( 'cart') );
    } else {
        var cart = [];
    }

	cart.show = function () {
        return cart;
	};

	cart.addProduct = function ( product ) {
        var whetherNewProduct = true;

        if ( !cart.length ) {
            product.quantity = 1;
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