arcadeshop.factory('services_login', ['services' , function(services) {
    let service = {menuInfo: menuInfo,register:register,loginLocal:loginLocal,socialLogin:socialLogin,requestRecoverPassword:requestRecoverPassword,recoverPassword:recoverPassword};
    return service;

    function menuInfo(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'menu_info', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function register(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'register', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function loginLocal(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'login_local', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function socialLogin(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'social_login', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };


    function requestRecoverPassword(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'request_recover_password', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function recoverPassword(data) {
        return new Promise((resolve,reject) => {
            services.post('login', 'recover_password', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);