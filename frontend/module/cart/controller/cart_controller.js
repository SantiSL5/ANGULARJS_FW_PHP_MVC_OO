arcadeshop.controller('cart_controller', function($rootScope, $scope, $location, toastr, services_cart) {
    $scope.listCart = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            $location.path('/login');
            toastr.info("Necesitas estar logueado para acceder al carrito");
        }else{
            data={'token':token};
            services_cart.listCart(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    localStorage.setItem("token", response['token']);
                    if (response['cart_products']==null) {
                        $scope.cartexistproducts=false;
                        numproducts=0;
                    }else {
                        $scope.cartexistproducts=true;
                        $scope.cartproducts=response['cart_products'];
                        services_cart.totalCart(data).then((responsecart) => {
                            if (responsecart['invalid_token'] == true){
                                $rootScope.logout();
                                toastr.info('Sesión invalida');
                            }else{
                                localStorage.setItem("token", responsecart['token']);
                                $scope.totalCart=responsecart['total_cart'];
                            }
                            $scope.$apply();
                        });
                    }
                }
                $scope.$apply();
            });
        }
    };

    $scope.addQuant = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            $location.path('/login');
            toastr.info("Necesitas estar logueado para acceder al carrito");
        }else{
            data={'token':token,'idproduct':this.cartitem.idvideogame};
            services_cart.addQuant(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    if (response['result']==2) {
                        toastr.info("No queda stock de este producto");
                    }else if (response['result']==0) {
                        toastr.info("No hay más stock en la tienda que "+response['quant']);
                    }
                    localStorage.setItem("token", response['token']);
                }
                $scope.listCart();
            });
        }
    };

    $scope.substQuant = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            $location.path('/login');
            toastr.info("Necesitas estar logueado para acceder al carrito");
        }else{
            data={'token':token,'idproduct':this.cartitem.idvideogame};
            services_cart.substQuant(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    localStorage.setItem("token", response['token']);
                }
                if (response['result']="delete") {
                    $rootScope.cartNumProducts=parseInt($rootScope.cartNumProducts)-1;
                }
                $rootScope.$apply();
                $scope.listCart();
            });
        }
    };

    $scope.deleteCart = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            $location.path('/login');
            toastr.info("Necesitas estar logueado para acceder al carrito");
        }else{
            data={'token':token,'idproduct':this.cartitem.idvideogame};
            services_cart.deleteCart(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    localStorage.setItem("token", response['token']);
                }
                $rootScope.cartNumProducts=parseInt($rootScope.cartNumProducts)-1;
                $rootScope.$apply();
                $scope.listCart();
            });
        }
    };

    $scope.checkout = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            $location.path('/login');
            toastr.info("Necesitas estar logueado para acceder al carrito");
        }else{
            data={'token':token};
            services_cart.checkout(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    toastr.info("Compra realizada");
                    localStorage.setItem("token", response['token']);
                }
                $rootScope.cartNumProducts=0;
                $rootScope.$apply();
                $scope.listCart();
            });
        }
    };

    $scope.listCart();
});