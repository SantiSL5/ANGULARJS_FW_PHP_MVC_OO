arcadeshop.controller('shop_controller', function($scope, services_shop, sliderdata, plataforms, genres) {
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
        services_shop.listall(data).then((response) => {
            products_page=4;
            max_pages=3;
            $scope.pages_showed=[];
            if (response['count']==0) {
                $scope.existproducts=false;
                numproducts=0;
            }else {
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
        $scope.optionshop="details";
        $scope.detailsproduct=this.videogame;
    };

    $scope.cleandetails = function () {
        $scope.optionshop="all";
    };

    $scope.actualpage=1;
    $scope.listall({"num_page":1,"minrange":$scope.slider.min,"maxrange":$scope.slider.max,"plataform":$scope.plataformsel,"age":$scope.agesel,"genero":$scope.generosel,"search":$scope.searchvalue});
});