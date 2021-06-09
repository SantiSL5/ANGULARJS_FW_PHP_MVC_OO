arcadeshop.controller('login_controller', function($scope, $rootScope, $route, toastr, $location,services_login) {

    $scope.socialGhub = function (data) {
        var provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('email');
        var authService = firebase.auth();
        authService.signInWithPopup(provider)
            .then(function(result) {
                data={type:'GHU','id':result.user.uid,'username':result.user.displayName,'email':result.user.email,'photo':result.user.photoURL};
                services_login.socialLogin(data).then((response) => {
                    if (data['operation']=='email-in-use') {
                        toastr.error("El email ya se esta usando en una cuenta");
                    }else{
                        toastr.info("Logueado Correctamente");
                        localStorage.removeItem('token');
                        localStorage.setItem('token', response['token']);
                        $rootScope.logued=true;
                        $location.path('/home');
                    }
                });
            })
            .catch(function(error) {
                toastr.error("Autentificación fallida")
            });
    };

    $scope.socialGoogle = function (data) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        var authService = firebase.auth();
        authService.signOut();
        authService.signInWithPopup(provider)
            .then(function(result) {
                data={type:'GU','id':result.user.uid,'username':result.user.displayName,'email':result.user.email,'photo':result.user.photoURL};
                services_login.socialLogin(data).then((response) => {
                    if (data['operation']=='email-in-use') {
                        toastr.error("El email ya se esta usando en una cuenta");
                    }else{
                        toastr.info("Logueado Correctamente");
                        localStorage.removeItem('token');
                        localStorage.setItem('token', response['token']);
                        $rootScope.logued=true;
                        $location.path('/home');
                    }
                });
            })
            .catch(function(error) {
                toastr.error("Autentificación fallida")
            });
    };

    $scope.userRegister = function () {
        if (this.userRegisterval.length ===0) {
            $scope.userRegisterError="Introduce un usuario";
            $scope.validateUserRegister=false;
        }else if (this.userRegisterval.length <= 3) {
            $scope.userRegisterError="El usuario tiene que tener mas de 3 carácteres";
            $scope.validateUserRegister=false;
        }else {
            $scope.validateUserRegister=true;
            $scope.userRegisterError="";
        }
    };

    $scope.emailRegister = function () {
        var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!emailre.test(this.emailRegisterval)) {
            $scope.emailRegisterError="Introduce un email válido";
            $scope.validateEmailRegister=false;
        }else {
            $scope.validateEmailRegister=true;
            $scope.emailRegisterError="";
        }
    };

    $scope.passwordRegister = function () {
        var passwordre =/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}/;
        if (!passwordre.test(this.passwordRegisterval)) {
            $scope.passwordRegisterError="La contraseña debe tener por lo menos 8 cáracteres,1 letra minúscula, 1 letra mayúscula y 1 número";
            $scope.validatePasswordRegister=false;
        }else {
            $scope.validatePasswordRegister=true;
            $scope.passwordRegisterError="";
        }
    };

    $scope.confPasswordRegister = function () {
        if (this.confPasswordRegisterval != $scope.passwordRegisterval) {
            $scope.confPasswordRegisterError="Las contraseñas deben ser iguales";
            $scope.validateConfPasswordRegister=false;
        }else {
            $scope.validateConfPasswordRegister=true;
            $scope.confPasswordRegisterError="";
        }
    };

    $scope.validateRegister = function () {
        $scope.userRegister();
        $scope.emailRegister();
        $scope.passwordRegister();
        $scope.confPasswordRegister();
        if ($scope.validateUserRegister==true && $scope.validateEmailRegister==true && $scope.validatePasswordRegister==true && $scope.validateConfPasswordRegister==true) {
            validate=true;
        }else {
            validate=false;
        }
        return validate;
    };

    $scope.register = function () {
        if ($scope.validateRegister()==true) {
            data={'username':$scope.userRegisterval,'email':$scope.emailRegisterval,'password':$scope.passwordRegisterval};
            services_login.register(data).then((response) => {
                if (response['0'] == true) {
                    toastr.info("Registrado Correctamente, correo de verificación enviado");
                    $location.path('/login');
                }else if (response['0'] == false) {
                    if (response['username'] == false) {
                        $scope.userRegisterError="El usuario introducido ya existe";
                    }
                    if (response['email'] == false) {
                        $scope.emailRegisterError="El email introducido ya existe";
                    }
                    if (response['username'] == true) {
                        $scope.userRegisterError="";
                    }
                    if (response['email'] == true) {
                        $scope.emailRegisterError="";
                    }
                }
                $scope.$apply();
            });
        }
    };

    $scope.login = function () {
        data={'username_login':$scope.userLoginval,'password_login':$scope.passwordLoginval};
        services_login.loginLocal(data).then((response) => {
            if (response['validate']==false) {
                toastr.info("No ha verificado su cuenta, por favor revise su correo");
            }else {
                if (response['username_created'] == true && response['correct_password'] == true) {
                    toastr.info("Logueado Correctamente");
                    localStorage.removeItem('token');
                    localStorage.setItem('token', response['token']);
                    $rootScope.checkToken();
                    $location.path('/home');
                }else {
                    if (response['username_created'] == false) {
                        $scope.userLoginError="El usuario introducido no se encuentra registrado";
                    }else{
                        if (response['correct_password'] == false) {
                            $scope.passwordLoginError="La contraseña introducida no es correcta";
                        }else{
                            $scope.passwordLoginError="";
                        }
                        $scope.userLoginError="";
                    }
                    $scope.$apply();
                }
            }
        });
    };

    $scope.recoverPasswordChange = function () {
        $location.path('/requestRecoverPassword');
    };

    $scope.validateRecoverPassEmail = function () {
        var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (!emailre.test(this.emailRecoverPassval)) {
            $scope.emailRecoverPassError="Introduce un email válido";
            $scope.emailrecoverPass=false;
        }else {
            $scope.emailrecoverPass=true;
            $scope.emailRecoverPassError="";
        }
    };

    $scope.requestRecoverPass = function () {
        $scope.validateRecoverPassEmail();
        data={'email':$scope.emailRecoverPassval};
        if ($scope.emailrecoverPass==true) {
            services_login.requestRecoverPassword(data).then((response) => {
                if (response[0] == true) {
                    toastr.info("Se ha enviado a tu correo un link para cambiar la contraseña");
                }else if (response[0] == false) {
                    if (response['email'] == false) {
                        toastr.info("El email introducido no existe");
                    }
                    if (response['email'] == true) {
                        toastr.info("Email enviado, revise su correo");
                        $scope.emailRecoverPassError="";
                    }
                }
            });
        }
    }

    $scope.validatePasswordRecoverPass = function () {
        var passwordre =/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}/;
        if (!passwordre.test(this.passRecoverPassval)) {
            $scope.passRecoverPassError="La contraseña debe tener por lo menos 8 cáracteres,1 letra minúscula, 1 letra mayúscula y 1 número";
            $scope.validatePassRecoverPass=false;
        }else {
            $scope.validatePassRecoverPass=true;
            $scope.passRecoverPassError="";
        }
    };

    $scope.validateConfPasswordRecoverPass = function () {
        if (this.confPassRecoverPassval != $scope.passRecoverPassval) {
            $scope.confPasswordRegisterError="Las contraseñas deben ser iguales";
            $scope.validateConfPassRecoverPass=false;
        }else {
            $scope.validateConfPassRecoverPass=true;
            $scope.confPasswordRegisterError="";
        }
    };

    $scope.validateRecoverPass = function () {
        $scope.validatePasswordRecoverPass();
        $scope.validateConfPasswordRecoverPass();
        if ($scope.validatePassRecoverPass==true && $scope.validateConfPassRecoverPass==true) {
            validate=true;
        }else {
            validate=false;
        }
        return validate;
    };

    $scope.recoverPassword = function () {
        data={'password':$scope.passRecoverPassval,'token':$route.current.params.token};
        if ($scope.validateRecoverPass() == true) {
            services_login.recoverPassword(data).then((response) => {
                if (response['token'] == true) {
                    if (response['invalid_token' == true]) {
                        toastr.info("Token invalido vuelva a solicitar el cambio de contraseña");
                    }else{
                        if (response[0]==true) {
                            toastr.info("Se ha cambiado la contraseña con exito"); 
                            $location.path('/login');
                        }else{
                            toastr.info("Usuario no existente");
                        }
                    }
                }else {
                    $location.path('/login');
                }
            });
        }
    }
});