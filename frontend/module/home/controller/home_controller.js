arcadeshop.controller('home_controller',function($http, $scope, $location, carousel, plataforms) {
    $scope.carousel= carousel;
    $scope.plataforms = plataforms;
    $scope.plataform = function () {
        idplat=this['item']['plataforma'];
        sessionStorage.setItem('plataform', idplat);
        $location.path('shop').replace();
    };
    $scope.category = function () {
        idgen=this['item']['category_name'];
        sessionStorage.setItem('genero', idgen);
        $location.path('shop').replace();
    };

    $scope.showrelated = function () {
        if (typeof $scope.limit==="undefined") {
            $scope.limit=2;
        }else{
            $scope.limit=$scope.limit+2;
        }
        $http.get('https://www.googleapis.com/books/v1/volumes?q=games')
        .then(function(response) {
            $scope.related = response.data.items;
            if ($scope.limit<=$scope.related.length) {
                $scope.relatedshowed=$scope.related.slice(0, $scope.limit);
            }
        })
    };

    $scope.showrelated();

}).directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function (scope) {
            scope.initCarousel = function(element) {
              // provide any default options you want
                var type =scope.$eval($(element).attr('carousel-type'));
                if (type["type"] == "main") {
                    var Options = scope.$eval($(element).owlCarousel({
                        loop: false,
                        rewind:true,
                        margin:10,
                        nav:true,
                        autoplay:true,
                        pagination: true,
                        autoplayTimeout:5000,
                        smartSpeed :900,
                        navigationText: [
                            "<i class='fa fa-chevron-left'></i>",
                            "<i class='fa fa-chevron-right'></i>"
                        ],
                        responsive:{
                            0:{
                                items:1
                            },
                            600:{
                                items:1
                            },
                            1000:{
                                items:1
                            }
                        }
                    }));
                };
                
                if (type["type"] == "secundary") {
                    var Options = scope.$eval($(element).owlCarousel({
                        loop: false,
                        rewind: true,
                        margin:10,
                        nav:true,
                        autoplay:true,
                        autoplayTimeout:5000,
                        smartSpeed :200,
                        pagination: true,
                        navigationText: [
                            "<i class='fa fa-chevron-left'></i>",
                            "<i class='fa fa-chevron-right'></i>"
                        ],
                        responsive:{
                            0:{
                                items:3
                            },
                            600:{
                                items:3
                            },
                            1000:{
                                items:3
                            }
                        }
                    }));
                }
                //init carousel
                $(element).owlCarousel(Options);
            };
        }
    };
}).directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);