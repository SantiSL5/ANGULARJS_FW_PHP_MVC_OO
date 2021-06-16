arcadeshop.factory('services_shop', ['services' , function(services) {
    let service = {listall: listall,showLikes:showLikes,details:details,like:like};
    return service;

    function listall(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'listall', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function showLikes(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'showlike', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function details(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'details', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function like(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'like', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);