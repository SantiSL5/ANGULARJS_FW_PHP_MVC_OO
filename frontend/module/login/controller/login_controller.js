arcadeshop.controller('login_controller', function($scope, $cookies, services_login) {

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
                        alert("Logueado Correctamente");
                        localStorage.removeItem('token');
                        localStorage.setItem('token', data['token']);
                        window.location.href = '/home';
                    }
                    $scope.$apply();
                });
            })
            .catch(function(error) {
                toastr.error("Autentificación fallida")
            });
        $scope.$apply();
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
                        alert("Logueado Correctamente");
                        localStorage.removeItem('token');
                        localStorage.setItem('token', data['token']);
                        window.location.href = '/home';
                    }
                    $scope.$apply();
                });
            })
            .catch(function(error) {
                toastr.error("Autentificación fallida")
            });
        $scope.$apply();
    };

    $scope.userRegister = function () {
        if (this.userRegister.length ===0) {
            $scope.userRegisterError="Introduce un usuario";
            $scope.validateUserRegister=false;
        }else if (this.userRegister.length <= 3) {
            $scope.userRegisterError="El usuario tiene que tener 3 o más carácteres";
            $scope.validateUserRegister=false;
        }else {
            $scope.validateUserRegister=true;
            $scope.userRegisterval=this.userRegister;
            $scope.userRegisterError="";
        }
        $scope.$apply();
    };

    $scope.emailRegister = function () {
        var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (this.emailRegister.length ===0) {
            $scope.emailRegisterError="Introduce un email";
            $scope.validateEmailRegister=false;
        }else if (!emailre.this.emailRegister) {
            $scope.emailRegisterError="Introduce un email válido";
            $scope.validateEmailRegister=false;
        }else {
            $scope.validateEmailRegister=true;
            $scope.emailRegisterval=this.emailRegister;
            $scope.emailRegisterError="";
        }
        $scope.$apply();
    };

    $scope.passwordRegister = function () {
        var passwordre =/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}/;
        if (this.passwordRegister.length ===0) {
            $scope.passwordRegisterError="Introduce una contraseña";
            $scope.validatePasswordRegister=false;
        }else if (!passwordre.this.passwordRegister) {
            $scope.passwordRegisterError="La contraseña debe tener por lo menos 8 cáracteres,1 letra minúscula, 1 letra mayúscula y 1 número";
            $scope.validatePasswordRegister=false;
        }else {
            $scope.validatePasswordRegister=true;
            $scope.passwordRegisterval=this.passwordRegister;
            $scope.passwordRegisterError="";
        }
        $scope.$apply();
    };

    $scope.confPasswordRegister = function () {
        if (this.confPasswordRegister === $scope.passwordRegisterval) {
            $scope.confPasswordRegisterError="Las contraseñas deben ser iguales";
            $scope.validateConfPasswordRegister=false;
        }else {
            $scope.validateConfPasswordRegister=true;
            $scope.confPasswordRegisterval=this.confPasswordRegister;
            $scope.confPasswordRegisterError="";
        }
        $scope.$apply();
    };

    $scope.validateRegister = function () {
        if ($scope.validateUserRegister==true && $scope.validateEmailRegister==true && $scope.validatePasswordRegister==true && $scope.validateConfPasswordRegister==true) {
            validate=true;
        }else {
            validate=false;
        }
        return validate;
    };

    $scope.register = function () {
        if ($scope.validateRegister()==true) {
            data={'username':$('#user-register').val(),'email':$('#email-register').val(),'password':$('#password-register').val()};
            services_login.socialLogin(data).then((response) => {
                if (data['operation']=='email-in-use') {
                    toastr.error("El email ya se esta usando en una cuenta");
                }else{
                    alert("Logueado Correctamente");
                    localStorage.removeItem('token');
                    localStorage.setItem('token', data['token']);
                    window.location.href = '/home';
                }
                $scope.$apply();
            });
            friendlyURL('?page=login&op=register').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',).then(function(data) {
                    console.log(data[0]);
                    if (data[0] == true) {
                        alert("Registrado Correctamente, correo de verificación enviado");
                        window.location.href = '/login'
                    }else if (data[0] == false) {
                        if (data['username'] == false) {
                            $('#error-user-register').text('El usuario introducido ya existe');
                        }
                        if (data['email'] == false) {
                            $('#error-email-register').text('El email introducido ya existe');
                        }
                        if (data['username'] == true) {
                            $('#error-user-register').text('');
                        }
                        if (data['email'] == true) {
                            $('#error-email-register').text('');
                        }
                    }
                }).catch(function() {
                    // window.location.href = '/503';
                }); 
            }); 
        }
    };

    function register() {
        $('#register-btn').on('click', function() {
            if (validate_register()==true) {
                friendlyURL('?page=login&op=register').then(function(url) {
                    ajaxPromise(url, 'POST', 'JSON',{'username':$('#user-register').val(),'email':$('#email-register').val(),'password':$('#password-register').val()}).then(function(data) {
                        console.log(data[0]);
                        if (data[0] == true) {
                            alert("Registrado Correctamente, correo de verificación enviado");
                            window.location.href = '/login'
                        }else if (data[0] == false) {
                            if (data['username'] == false) {
                                $('#error-user-register').text('El usuario introducido ya existe');
                            }
                            if (data['email'] == false) {
                                $('#error-email-register').text('El email introducido ya existe');
                            }
                            if (data['username'] == true) {
                                $('#error-user-register').text('');
                            }
                            if (data['email'] == true) {
                                $('#error-email-register').text('');
                            }
                        }
                    }).catch(function() {
                        // window.location.href = '/503';
                    }); 
                }); 
            }
        });
    }

    function login() {
        $('#login-btn').on('click', function() {
            friendlyURL('?page=login&op=login_local').then(function(url) {
                ajaxPromise(url, 'POST', 'JSON',{'username_login':$('#user-login').val(),'password_login':$('#password-login').val()}).then(function(data) {
                    if (data['validate']==false) {
                        toastr.info("No ha verificado su cuenta, por favor revise su correo");
                    }else {
                        if (data['username_created'] == true && data['correct_password'] == true) {
                            alert("Logueado Correctamente");
                            localStorage.removeItem('token');
                            localStorage.setItem('token', data['token']);
                            window.location.href = '/home';
                        }else {
                            if (data['username_created'] == false) {
                                $('#error-user-login').text('El usuario introducido no se encuentra registrado');
                            }else{
                                if (data['correct_password'] == false) {
                                    $('#error-password-login').text('La contraseña introducida no es correcta');
                                }else{
                                    $('#error-password-login').text('');
                                }
                                $('#error-user-login').text('');
                            }
                        }
                    }
                }).catch(function() {
                    // window.location.href = 'index.php?page=503';
                });
            }); 
        });
    }

    function registerbtn_change() {
        $('#register-option').on('click', function() {
            friendlyURL('?page=login&op=listregister').then(function(url) {
                window.location.href = url;
            }); 
        });
    }

    function loginbtn_change() {
        $('#login-option').on('click', function() {
            friendlyURL('?page=login&op=list').then(function(url) {
                window.location.href = url;
            }); 
        });
    }

    function recover_password_change() {
        $('#recover-password').on('click', function() {
            friendlyURL('?page=login&op=listrequestrecover').then(function(url) {
                window.location.href = url;
            }); 
        });
    }

    function validate_recover_password_mail() {
        var emailre = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        validate=true;

        if ($('#email-recover').val().length === 0) {
            $('#error-email-recover').text('Introduce un email');
            validate=false;
        }else if (!emailre.test($('#email-recover').val())) {
            $('#error-email-recover').text('Introduce un email válido');
            validate=false;
        }else {
            $('#error-user-recover').text('');
        }

        return validate;
    }

    function validate_recover_password() {
        var passwordre =/(?=.*\d.*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}/;
        validate=true;

        if ($('#password-recover').val().length === 0) {
            $('#error-password-recover').text('Introduce una contraseña');
            validate=false;
        }else if (!passwordre.test($('#password-recover').val())) {
            $('#error-password-recover').text('La contraseña debe tener por lo menos 8 cáracteres,1 letra minúscula, 1 letra mayúscula y 1 número');
            validate=false;
        }else{
            $('#error-password-recover').text('');
        }

        if (!($('#password-recover').val()==$('#confpassword-recover').val())) {
            $('#error-confpassword-recover').text('Las contraseñas deben ser iguales'); 
            validate=false;
        } else {
            $('#error-confpassword-recover').text(''); 
        }

        return validate;
    }

    function request_recover_password() {
            $('#recover-password-mail').on('click', function() {
                if (validate_recover_password_mail()==true) {
                    friendlyURL('?page=login&op=request_recover_password').then(function(url) {
                        ajaxPromise(url, 'POST', 'JSON',{'email':$('#email-recover').val()}).then(function(data) {
                            if (data[0] == true) {
                                toastr.info("Se ha enviado a tu correo un link para cambiar la contraseña");
                            }else if (data[0] == false) {
                                if (data['email'] == false) {
                                    $('#error-email-recover').text('El email introducido no existe');
                                }
                                if (data['email'] == true) {
                                    $('#error-email-recover').text('');
                                }
                            }
                        }).catch(function(textStatus) {
                            console.log("hola")
                            // window.location.href = '/503';
                        }); 
                    }); 
                }
            });
    }

    function recover_password() {
        $('#recover-password-cpass').on('click', function() {
            url=window.location.href.split('/');
            token=url[5];
            if (validate_recover_password()==true) {
                friendlyURL('?page=login&op=recover_password').then(function(url) {
                    ajaxPromise(url, 'POST', 'JSON',{'password':$('#password-recover').val(),'token':token}).then(function(data) {
                        if (data['token'] == true) {
                            if (data['invalid_token' == true]) {
                                toastr.info("Token invalido vuelva a solicitar el cambio de contraseña");
                            }else{
                                if (data[0]==true) {
                                    toastr.info("Se ha cambiado la contraseña con exito"); 
                                }else{
                                    toastr.info("Usuario no existente");
                                }
                            }
                        }else {
                            window.location.href = '/login';
                        }
                    }).catch(function() {
                        // window.location.href = '/503';
                    }); 
                }); 
            }
        });
    }

    $scope.cookieCheck = function () {
        validate=$cookies.get('validate');
        if (!(validate == null)) {
            toastr.info(validate);
            $cookies.remove('validate');
        }
    };

    function social_load() {
        url=window.location.href.split('/');
        check_login=url[4];
        if (check_login=='list' || check_login==null) {
            social_config();
            social_google();
            social_ghub();
        }
    }
});