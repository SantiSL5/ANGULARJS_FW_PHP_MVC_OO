// , 'toastr', 'ui.bootstrap'
var arcadeshop = angular.module('arcadeshop', ['ngRoute','rzModule','toastr']);
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
                }).when("/register", {templateUrl: "frontend/module/login/view/register.html", controller: "login_controller",
                // resolve: {
                    
                // }
                }).when("/login", {templateUrl: "frontend/module/login/view/login.html", controller: "login_controller",
                // resolve: {

                // }
                }).when("/validate_account/:token", {
                    resolve: {
                        validateUser: function ($route, $location, services, toastr) {
                            services.post('login', 'validate_account', {"token":$route.current.params.token})
                            .then(function (response) {
                                toastr.info(response["text"]);
                                $location.path('/login');
                            });
                        },
                    }
                }).when("/requestRecoverPassword", {templateUrl: "frontend/module/login/view/request_recover_password.html", controller: "login_controller",
                // resolve: {

                // }
                }).when("/recoverPassword/:token", {templateUrl: "frontend/module/login/view/recover_password.html", controller: "login_controller",
                // resolve: {

                // }
                }).otherwise("/", {templateUrl: "frontend/module/home/view/home.html", controller: "home_controller"});
    }]);

arcadeshop.run(function($rootScope, $location, $route, services, services_menu, services_login, toastr) {

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

    $rootScope.autoComplete = function() {
        input=this.inputsearch;
        $rootScope.textsearch=input;
        dataac={"nombre":this.inputsearch}
        services_menu.autoComplete(dataac).then((response) => {
            if (response==0) {
                $rootScope.found=false;
                $rootScope.$apply();
            }else{
                $rootScope.found=true;
                $rootScope.resultsearch=response;
                $rootScope.$apply();
            }
        });
    }

    $rootScope.selectname = function() {
        $rootScope.found=false;
        $rootScope.textsearch=this.names.nombre;
        $rootScope.searchjump();
    }

    $rootScope.searchjump = function() {
        sessionStorage.setItem('search', $rootScope.textsearch);
        $location.path('/shop');
        $route.reload();
    }

    $rootScope.$on("$viewContentLoaded", function(event, current, previous){
        $rootScope.changelang();
    });

    $rootScope.$on("$changeRouteSuccess", function(event, current, previous){
        $rootScope.changelang();
    });


    $rootScope.checkToken = function() {
        $rootScope.changelang();
        token = localStorage.getItem('token');
        if (token == null) {
            $rootScope.logout();
        }else{
            datamenu={"token":token};
            services_login.menuInfo(datamenu).then((response) => {
                if (response['invalid_token'] == true){
                    toastr.info("La sesión ha expirado vuelvete a loguear");
                    $rootScope.logout();
                }else{
                    localStorage.setItem("token", response['token']);
                    $rootScope.usernameMenu=response['username'];
                    $rootScope.avatarMenu=response['avatar'];
                    $rootScope.logued=true;
                }
                $rootScope.$apply();
            });
        }
    }

    $rootScope.registerbtn = function() {
        $location.path('/register');
    }

    $rootScope.loginbtn = function() {
        $location.path('/login');
    }

    $rootScope.logout = function() {
        localStorage.removeItem('token');
        $rootScope.logued=false;
    }

    var config = {
        apiKey: API_KEY_SS,
        authDomain: AUTH_DOMAIN,
        databaseURL: DATABASE_URL,
        projectId: PROJECTID,
        storageBucket: "",
        messagingSenderId: MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
    $rootScope.checkToken();
});