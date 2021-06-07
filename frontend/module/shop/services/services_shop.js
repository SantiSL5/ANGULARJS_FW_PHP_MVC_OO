arcadeshop.factory('services_shop', ['services' , function(services) {
    let service = {listall: listall};
    return service;

    function listall(data) {
        return new Promise((resolve,reject) => {
            services.post('shop', 'listall', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);