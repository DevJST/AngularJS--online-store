'use strict'

//=============================================Nav====================================================== 

var ctrls = angular.module( 'ctrls', [ 'ngRoute', 'angularFileUpload' ] );

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
    $http.get( 'api/admin/products/getProducts' ).
        success( function( data ) {
            $scope.products = data;
        }).error( function() {
            console.log( 'Błąd pobierania produktów' );
    });

    $scope.deleteProduct = function ( productId, index ) {

        if ( !confirm( 'Czy na pewno chcesz usunąć ten produkt?' ) ) 
            return;
            
        $http.post( 'api/admin/products/deleteProduct', {
            productId : productId
        }).success( function() {
            $scope.products.splice( index, 1 );
        }).error( function() {
            console.log('Błąd podczas próby usuwania produktu');
        });
    };
}]);

ctrls.controller( 'EditProductCtrl', [ '$scope', '$http', '$routeParams', '$timeout', 'FileUploader', function( $scope, $http, $routeParams, $timeout, FileUploader ) {
	$scope.productId = $routeParams.id;

    $http.get( 'api/admin/products/getProduct/' + $routeParams.id ).
        success( function( data ) {
            $scope.product = data;
        }).error( function() {
            console.log('Błąd pobierania produktu');
    });

    $scope.success = false;

    $scope.saveChanges = function ( product ) {
        $http.post( 'api/admin/products/updateProduct', {
            product : product
        }).success( function() {
            // TODO: make a returned json status value handling, after updating data.
            $scope.success = true;
            
            $timeout(function() {
                $scope.success = false;
            }, 3000);
        }).error( function() {
            console.log('Błąd podczas próby uaktualnienia produktu');
        });
    };

    function getImages() {
        $http.get( 'api/admin/images/get/' +  $routeParams.id ).
        success( function( data ) {
            $scope.images = data;
        }).error( function() {
            console.log('Błąd pobierania zdjęć produktu');
        });
    }
    
    getImages();
    
    $scope.removeImgages = function( productId, imageName ) {
        $http.post( 'api/admin/images/delete', {
            id : productId,
            name: imageName
        }).success( function() {
              $scope.images.splice( productId, 1 );
          }).error( function() {
              console.log('Błąd usuwania zdjęcia z serwera');
          });  
    };

    var uploader = $scope.uploader = new FileUploader({
            url: 'api/admin/images/upload/' + $routeParams.id
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    }); 

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        getImages();
    }; 
    
    
}]);

ctrls.controller( 'AddProductCtrl', [ '$scope', '$http', '$timeout', function( $scope, $http, $timeout ) {
	$scope.addProduct = function ( product ) {
        $http.post( 'api/admin/products/createProduct', {
            product : product
        }).success( function() {
            // TODO: make a returned json status value handling, after adding data.
            $scope.success = true;
            
            $timeout(function() {
                $scope.success = false;
                $scope.product = {};
            }, 3000);
        }).error( function() {
            console.log('Błąd podczas próby dodawania produktu');
        });
    };
}]);

//==========================================Admin Users=================================================

ctrls.controller( 'UsersCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $http.get( 'api/admin/users/getUsers' ).
    success( function( data ) {
        $scope.users = data;
    }).error( function() {
        console.log('Błąd pobierania listy użytkowników');
    });

    $scope.deleteUser = function ( userId, index ) {
        if ( !confirm( 'Czy na pewno chcesz usunąć tego użytkownika?' ) ) 
            return;

        $http.post( 'api/admin/users/deleteUser', {
            userId : userId
        }).success( function() {
            $scope.users.splice( index, 1 );
        }).error( function() {
            console.log('Błąd podczas próby usuwania użytkownika');
        });
    };
}]);

ctrls.controller( 'EditUserCtrl', [ '$scope', '$http', '$routeParams', '$timeout', function( $scope, $http, $routeParams, $timeout ) {
    $scope.user = {};
    $scope.user.role = 'user';

    $scope.success = false;

    $http.get( 'api/admin/users/getUser/' + $routeParams.id  ).
    success( function( data ) {
        $scope.user = data;
    }).error( function() {
        console.log('Błąd pobierania danych użytkownika');
    });

    $scope.saveChanges = function ( user ) {
        $http.post( 'api/admin/users/updateUser', {
            userId: $routeParams.id,
            name: user.name,
            password: user.password,
            passconf: user.passconf,
            email: user.email,
            role: user.role
        }).success( function( errors ) {
            // TODO: make a returned json status value handling, after updating data.
            if ( errors ) {
                $scope.errors = errors; console.log(errors);
            } else {
                // TODO: make a returned json status value handling, after adding data.
                $scope.errors = null;
                $scope.success = true;
                
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {
                        role: 'user'
                    };
                }, 3000);
            }
        }).error( function() {
            console.log('Błąd podczas próby uaktualnienia użytkownika');
        });
    };
}]);

ctrls.controller( 'AddUserCtrl', [ '$scope', '$http', '$timeout', function( $scope, $http, $timeout ) {
    $scope.user = {};
    $scope.user.role = 'user';

    $scope.success = false;

    $scope.addUser = function ( user ) {
        $http.post( 'api/admin/users/createUser', {
            name: user.name,
            password: user.password,
            passconf: user.passconf,
            email: user.email,
            role: user.role
        }).success( function( errors ) {
            if ( errors ) {
                $scope.errors = errors; console.log(errors);
            } else {
                // TODO: make a returned json status value handling, after adding data.
                $scope.errors = null;
                $scope.success = true;
                
                $timeout(function() {
                    $scope.success = false;
                    $scope.user = {
                        role: 'user'
                    };
                }, 3000);
            }
        }).error( function() {
            console.log('Błąd podczas próby dodawania użytkownika');
        });
    };
}]);

//==========================================Admin Orders================================================

ctrls.controller( 'OrdersCtrl', [ '$scope', '$http', function( $scope, $http ) {
    $http.get( '' ).
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

        if ( !confirm( 'Czy na pewno chcesz usunąć to zamówienie?' ) ) 
            return;

        $scope.orders.splice( order, 1 );
    };
}]);





//===========================================Site Products================================================

ctrls.controller( 'SiteProductsCtrl', [ '$scope', '$http', 'cartSrv', function( $scope, $http, cartSrv ) {
    $http.get( 'api/site/products/getProducts' ).
    success( function( data ) {
        $scope.products = data;
    }).error( function() {
        console.log('Błąd podczas próby pobierania produktów');
    });

    $scope.addToCart = function ( product ) {
        cartSrv.addProduct( product );
    };
}]);

ctrls.controller( 'SiteProductCtrl', [ '$scope', '$http', '$routeParams', 'cartSrv',  function( $scope, $http, $routeParams, cartSrv ) {
    $http.get( 'api/site/products/getProduct/' +  $routeParams.id ).
    success( function( data ) {
        $scope.product = data;
    }).error( function() {
        console.log('Błąd podczas pobierania produktu');
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

//===========================================Site Orders=================================================

ctrls.controller( 'SiteOrdersCtrl', [ '$scope', '$http', function ( $scope, $http ) {
    $http.get( '' ).
    success( function( data ) {
        $scope.orders = data;
    }).error( function() {
        console.log('Błąd pobierania pliku orders.json');
    });
}]);


//=========================================Login & Register==============================================

ctrls.controller( 'loginCtrl', [ '$scope', function ( $scope ) {
    $scope.input = {};

    $scope.loginFormSubmit = function () {
        $scope.errors = [];
        $scope.errors.login = 'Błędne hasło lub e-mail';

        console.log($scope.input);
    };
}]);

ctrls.controller( 'registerCtrl', [ '$scope', function ( $scope ) {
    $scope.registerFormSubmit = function () {
        $scope.input = {};
        $scope.errors = {};
        
        console.log($scope.input);

        $scope.errors.email = "jakiś błąd";
        $scope.submitted = true;
    };
}]);