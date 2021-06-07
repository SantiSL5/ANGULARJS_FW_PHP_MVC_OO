arcadeshop.factory('services_menu', ['services' , function(services) {
    let service = {autoComplete: autoComplete};
    return service;

    function autoComplete(data) {
        return new Promise((resolve,reject) => {
            services.post('menu', 'autoComplete', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);