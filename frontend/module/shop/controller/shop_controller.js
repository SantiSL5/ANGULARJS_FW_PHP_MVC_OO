arcadeshop.controller('shop_controller', function($scope, $rootScope, toastr, services_shop, services_cart, sliderdata, plataforms, genres) {
    $scope.optionshop="all";
    $scope.ages=[3,7,12,16,18];
    $scope.plataforms=plataforms;
    $scope.genres=genres;
    $scope.slider = {
        min: sliderdata[0]['minim'],
        max: sliderdata[0]['maxim'],
        ceil: sliderdata[0]['maxim'],
        floor: sliderdata[0]['minim'],
    };

    $scope.listall = function (data) {
        token=localStorage.getItem('token');
        data.token=token;
        services_shop.listall(data).then((response) => {
            products_page=4;
            max_pages=3;
            $scope.pages_showed=[];
            if (response['invalid_token'] == true){
                $rootScope.logout();
                toastr.info('Sesión invalida');
            }else{
                localStorage.setItem("token", response['token']);
                if (response['count']==0) {
                    $scope.existproducts=false;
                    numproducts=0;
                }else {
                    if (response['likes']==false || response['likes']==null) {
                        $scope.likes=[];
                    }else {
                        $scope.likes=response['likes'];
                    }
                    $scope.existproducts=true;
                    $scope.allproducts=response[1];
                    numproducts=response[0];
                    $scope.numpages=Math.ceil(numproducts/products_page);
                    pages=Array.from({length: $scope.numpages}, (_, index) => index + 1);
                    for (let i = 0; i < pages.length; i++) {
                        if (pages[i] >= $scope.actualpage && pages[i] < $scope.actualpage + max_pages) {
                            $scope.pages_showed.push(pages[i]);
                        }
                    }
                }
            }
            $scope.$apply();
        });
    };

    $scope.changepage = function () {
        $scope.actualpage=this.page;
        if ($scope.actualpage > $scope.numpages) {
            $scope.actualpage=$scope.numpages;
        }else if ($scope.actualpage < 1) {
            $scope.actualpage=1;
        }
        $scope.listall({"num_page":$scope.actualpage});
    };

    $scope.nextpage = function () {
        $scope.actualpage=$scope.actualpage+1;
        if ($scope.actualpage > $scope.numpages) {
            $scope.actualpage=$scope.numpages;
        }else if ($scope.actualpage < 1) {
            $scope.actualpage=1;
        }
        $scope.listall({"num_page":$scope.actualpage});
    };

    $scope.previouspage = function () {
        $scope.actualpage=$scope.actualpage-1;
        if ($scope.actualpage > $scope.numpages) {
            $scope.actualpage=$scope.numpages;
        }else if ($scope.actualpage < 1) {
            $scope.actualpage=1;
        }
        $scope.listall({"num_page":$scope.actualpage});
    };

    $scope.selectplataform = function () {
        $scope.plataformsel=this['plataform']['plataforma'];
    };

    $scope.selectage = function () {
        $scope.agesel=this['age'];
    };

    $scope.selectgenre = function () {
        $scope.generosel=this['genre']['category_name'];
    };

    $scope.applyfilters = function () {
        $scope.listall({"num_page":1,"minrange":$scope.slider.min,"maxrange":$scope.slider.max,"plataform":$scope.plataformsel,"age":$scope.agesel,"genero":$scope.generosel,"search":$scope.searchvalue});
    };

    $scope.cleanfilters = function () {
        $scope.plataformsel='';
        $scope.agesel='';
        $scope.generosel='';
        $scope.searchvalue='';
        $scope.slider = {
            min: sliderdata[0]['minim'],
            max: sliderdata[0]['maxim'],
            ceil: sliderdata[0]['maxim'],
            floor: sliderdata[0]['minim'],
        };
        $scope.listall({"num_page":1,"minrange":$scope.slider.min,"maxrange":$scope.slider.max});
    };

    if (sessionStorage.getItem('search')!=null) {
        $scope.searchvalue=sessionStorage.getItem('search');
        sessionStorage.removeItem('search');
    }
    if (sessionStorage.getItem('genero')!=null) {
        $scope.generosel=sessionStorage.getItem('genero');
        sessionStorage.removeItem('genero');
    }
    if (sessionStorage.getItem('plataform')!=null) {
        $scope.plataformsel=sessionStorage.getItem('plataform');
        sessionStorage.removeItem('plataform');
    }

    $scope.details = function () {
        $scope.detailsproduct=this.videogame;
        data={'id':$scope.detailsproduct.id}
        services_shop.details(data).then((response) => {
            $scope.applyfilters();
            $scope.optionshop="details";
        });
    };

    $scope.cleandetails = function () {
        $scope.optionshop="all";
    };

    $scope.like = function () {
        token=localStorage.getItem('token');
        if (token===null || typeof token === 'undefined') {
            toastr.info("Necesitas loguearte para dar like");
        }else{
            productlike=this.videogame || this.detailsproduct;
            data={'token':token,'idproduct':productlike.id}
            if ($scope.likes.indexOf(productlike.id) != -1) {
                $scope.likes.splice($scope.likes.indexOf(productlike.id), 1);
                productlike.likes=parseInt(productlike.likes,10)-1;
            }else if ($scope.likes.indexOf(productlike.id) == -1) {
                $scope.likes.push(productlike.id);
                productlike.likes=parseInt(productlike.likes,10)+1;
            }
            services_shop.like(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    localStorage.setItem("token", response['token']);
                }
            });
        }
    };

    $scope.addQuant = function () {
        token=localStorage.getItem('token');
        if (token==null || token==undefined) {
            toastr.info("Necesitas estar logueado para añadir productos al carrito");
        }else{
            productcart=this.videogame || this.detailsproduct;
            data={'token':token,'idproduct':productcart.id};
            services_cart.addQuant(data).then((response) => {
                if (response['invalid_token'] == true){
                    $rootScope.logout();
                    toastr.info('Sesión invalida');
                }else{
                    if (response['result']==2) {
                        toastr.info("No queda stock de este producto");
                    }else if (response['result']==0) {
                        toastr.info("No hay más stock en la tienda que "+response['quant']);
                    }else {
                        toastr.info("Añadido al carrito");
                    }
                    console.log(response['quant']);
                    if (response['quant']==null) {
                        $rootScope.cartNumProducts=parseInt($rootScope.cartNumProducts)+1;
                    }
                    localStorage.setItem("token", response['token']);
                }
                $rootScope.$apply();
            });
        }
    };

    $scope.actualpage=1;
    $scope.listall({"num_page":1,"minrange":$scope.slider.min,"maxrange":$scope.slider.max,"plataform":$scope.plataformsel,"age":$scope.agesel,"genero":$scope.generosel,"search":$scope.searchvalue});
});