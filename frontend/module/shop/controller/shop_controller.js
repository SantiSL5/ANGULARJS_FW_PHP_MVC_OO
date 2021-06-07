arcadeshop.controller('shop_controller', function($scope, services_shop, sliderdata, plataforms, genres) {
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
            $scope.allproducts=response[1];
            numproducts=response[0];
            $scope.numpages=Math.ceil(numproducts/products_page);
            pages=Array.from({length: $scope.numpages}, (_, index) => index + 1);
            $scope.pages_showed=[];
            for (let i = 0; i < pages.length; i++) {
                if (pages[i] >= $scope.actualpage && pages[i] < $scope.actualpage + max_pages) {
                    $scope.pages_showed.push(pages[i]);
                }
            }
            $scope.$apply();
        });
    };

    $scope.changepage = function () {
        $scope.actualpage=this.page;
        console.log($scope.actualpage);
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

    $scope.actualpage=1;
    $scope.listall({"num_page":$scope.actualpage});

    // $scope.currentPage = 2;
    // $scope.listall = function() {

    // }
    // $scope.listall();

    // $scope.numPages = function () {
    //     return Math.ceil(60 / $scope.numPerPage);
    // };

    
    // end_services
    // $scope.
    // let filteredCars = [];
    // let currentCars = [];

    // $scope.filters = filters;
    // $scope.itemsPerPage = 12;
    // $scope.totalItems = cars.length;
    // $scope.currentPage = 1;
    // $scope.currentFilters = {};
    // $scope.favs = services_shop.setArray(favs);
    // $scope.cart = services_shop.setArray(cart);

    // $scope.showDetails = function(carPlate) {
    //     location.href = "#/shop/" + carPlate;
    // };// end_showDetails

    // $scope.pageChanged = function() {
    //     $scope.cars = cars.slice((($scope.currentPage - 1) * $scope.itemsPerPage), ($scope.currentPage * $scope.itemsPerPage));
    // };// end_PageChanged

    // $scope.filterCars = function(value, key) {
    //     $scope.currentFilters[value + '-' + key] = true;

    //     for (row in cars) {
    //         if (cars[row][key] == value) {
    //             if (!currentCars.includes(cars[row].carPlate)) {
    //                 filteredCars.push(cars[row]);
    //                 currentCars.push(cars[row].carPlate);
    //             }// end_if
    //         }// end_if
    //     }// end_for
        
    //     setPage(filteredCars, 1);
    // };// end_filterCars

    // if (localStorage.brandShop) {
    //     $scope.filterCars(localStorage.brandShop, 'brand');
    //     localStorage.removeItem('brandShop');
    // }else {
    //     $scope.cars = cars.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));
    // }// end_else

    // $scope.removeFilter = function(value, key) {
    //     let newFilters = [];
    //     let newCurrentCars = [];
        
    //     $scope.currentFilters[value + '-' + key] = false;

    //     for (row in filteredCars) {
    //         if (filteredCars[row][key] != value) {
    //             newFilters.push(filteredCars[row]);
    //             newCurrentCars.push(filteredCars[row].carPlate)
    //         }// end_if
    //     }// end_for
        
    //     if (newFilters.length > 0) {
    //         setPage(newFilters, 1, newFilters, newCurrentCars);
    //     }else {
    //         $scope.clearAllFilters();
    //     }// end_else
    // };// end_removeFilter

    // $scope.clearAllFilters = function() {
    //     setPage(cars, 1, [], [])
    // };// end_clearAllFilters

    // function setPage(carsVal, currentPageVal, filteredCarsVal = undefined, currentCarsVal = undefined) {
    //     $scope.currentPage = currentPageVal;
    //     $scope.totalItems = carsVal.length;
    //     $scope.cars = carsVal.slice((($scope.currentPage - 1) * $scope.itemsPerPage), (($scope.currentPage) * $scope.itemsPerPage));

    //     if (filteredCarsVal != undefined) {
    //         filteredCars = filteredCarsVal;
    //     }// end_if 
    //     if (currentCarsVal != undefined) {
    //         currentCars = currentCarsVal;
    //     }// end_if
    // }// end_setPage
});