arcadeshop.factory('services_contact', ['services' , function(services) {
    let service = {contact: contact};
    return service;

    function contact(data) {
        return new Promise((resolve,reject) => {
            services.post('contact', 'contact', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };
}]);