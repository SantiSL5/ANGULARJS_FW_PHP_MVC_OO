// , 'toastr', 'ui.bootstrap'
var arcadeshop = angular.module('arcadeshop', ['ngRoute','rzModule']);
arcadeshop.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider
                .when("/", {templateUrl: "frontend/module/home/view/home.html", controller: "home_controller",
                    resolve: {
                        carousel: function (services) {
                            return services.get('home','carousel');
                        },
                        plataforms: function (services) {
                            return services.get('home','plataforms');
                        }
                    }
                }).when("/home", {templateUrl: "frontend/module/home/view/home.html", controller: "home_controller",
                    resolve: {
                        carousel: function (services) {
                            return services.get('home','carousel');
                        },
                        plataforms: function (services) {
                            return services.get('home','plataforms');
                        }
                    }
                }).when("/shop", {templateUrl: "frontend/module/shop/view/shop.html", controller: "shop_controller",
                    resolve: {
                        sliderdata: function (services) {
                            return services.get('shop','rangeslider');
                        },
                        plataforms: function (services) {
                            return services.get('shop','plataforms');
                        },
                        genres: function (services) {
                            return services.get('shop','categories');
                        }
                    }
                }).when("/register", {templateUrl: "frontend/module/shop/view/register.html", controller: "login_controller",
                resolve: {
                    // sliderdata: function (services) {
                    //     return services.get('shop','rangeslider');
                    // },
                    // plataforms: function (services) {
                    //     return services.get('shop','plataforms');
                    // },
                    // genres: function (services) {
                    //     return services.get('shop','categories');
                    // }
                }
                }).when("/login", {templateUrl: "frontend/module/shop/view/login.html", controller: "login_controller",
                resolve: {
                    // sliderdata: function (services) {
                    //     return services.get('shop','rangeslider');
                    // },
                    // plataforms: function (services) {
                    //     return services.get('shop','plataforms');
                    // },
                    // genres: function (services) {
                    //     return services.get('shop','categories');
                    // }
                }
                }).otherwise("/", {templateUrl: "frontend/module/home/view/home.html", controller: "home_controller"});
    }]);

arcadeshop.run(function($rootScope, $location, services) {

    $rootScope.changelang = function(lang) {
        lang = lang || localStorage.getItem('app-lang') || 'en';
        localStorage.setItem('app-lang', lang);
        var dataelm = document.querySelectorAll('[data-tr]');
        services.postfile('http://localhost/frontend/assets/general/lang/' + lang + '.json').then(function(response) {
            for (var i = 0; i < dataelm.length; i++) {
                if (response.hasOwnProperty(lang)) {
                    dataelm[i].innerHTML=response[lang][dataelm[i].dataset.tr];
                }else{
                    dataelm[i].innerHTML=dataelm[i].dataset.tr;
                }
            }
        });
    }

    $rootScope.$on("$routeChangeSuccess", function(event, current, previous){
        $rootScope.changelang();
    });

});
               // .when("/home", {templateUrl: "frontend/module/home/view/home.html", controller: "home_controller",
                //     resolve: {
                //         carousel: function (services) {
                //             return services.get('home','carousel');
                //         },
                //         plataforms: function (services) {
                //             return services.get('home','plataforms');
                //         }
                //     }
                // })

                // .when("/home/:id", {
                //     templateUrl: "frontend/modules/home/view/details.view.html",
                //     controller: "detailsBCtrl",
                //     resolve: {
                //         selbreed: function (services, $route) {
                //             return services.get('home', 'load_list', $route.current.params.id);
                //         }
                //     }
                // })

                // .when("/home/active_user/:token", {
                //     resolve: {
                //         recpass: function (services, $route) {
                //             console.log($route.current.params.token);
                //             return services.put('home','active_user',{'token':JSON.stringify({'token':$route.current.params.token})})
                //             .then(function(response){
                //                 console.log(response);
                //                 location.href = '#/';
                //             });
                //         }
                //     }
                // })

                // .when("/contact", {templateUrl: "frontend/modules/contact/view/contact.view.html", controller: "contactCtrl"})

                // .when("/adoptions", {
                //     templateUrl: "frontend/modules/adoptions/view/adoptions.view.html", 
                //     controller: "adoptionsCtrl",
                //     resolve: {
                //         adoptions: function (services) {
                //             return services.get('adoptions', 'load_list','%');
                //         },
                //         breeds: function (services) {
                //             return services.get('adoptions', 'all_breeds');
                //         }
                //     }
                // })

                // .when("/ubication", {
                //     templateUrl: "frontend/modules/ubication/view/ubication.view.html", 
                //     controller: "ubicationCtrl",
                //     resolve: {
                //         ubications: function (services) {
                //             return services.get('ubication', 'load_location');
                //         },
                //         provinces: function (services) {
                //             return services.get('ubication', 'load_prov');
                //         }
                //     }
                // })

                // .when("/dogs", {
                //     templateUrl: "frontend/modules/dogs/view/dogs.view.html", 
                //     controller: "dogsCtrl",
                //     resolve: {
                //         provinces: function (services) {
                //             return services.get('dogs', 'load_provinces');
                //         }
                //     }
                // })

                // .when("/login", {
                //     templateUrl: "frontend/modules/login/view/login.view.html",controller: "loginCtrl"})

                // .when("/login/changepass/:token", {
                //     templateUrl: "frontend/modules/login/view/recpass.view.html",
                //     controller: "changepassCtrl"
                // })

                // .when("/profile", {
                //     templateUrl: "frontend/modules/login/view/profile.view.html",
                //     controller: "profileCtrl",
                //     resolve: {
                //         infoUser: function (services,localstorageService) {
                //             return services.get('login', 'print_user',localstorageService.getUsers());
                //         }
                //     }
                // })