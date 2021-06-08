arcadeshop.factory('services_login', ['services' , function(services) {
    let service = {menuInfo: menuInfo,register:register,socialConfig:socialConfig,socialLogin:socialLogin};
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

    function socialConfig() {
        var config = {
            apiKey: API_KEY_SS,
            authDomain: AUTH_DOMAIN,
            databaseURL: DATABASE_URL,
            projectId: PROJECTID,
            storageBucket: "",
            messagingSenderId: MESSAGING_SENDER_ID
        };
        firebase.initializeApp(config);
    }

    function socialLogin(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'social_login', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);