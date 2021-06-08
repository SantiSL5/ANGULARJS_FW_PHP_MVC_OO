arcadeshop.factory('services_login', ['services' , function(services) {
    let service = {menuInfo: menuInfo,register:register,loginLocal:loginLocal,socialLogin:socialLogin};
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
}]);