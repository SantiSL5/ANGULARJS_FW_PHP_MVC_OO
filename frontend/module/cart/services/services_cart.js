arcadeshop.factory('services_cart', ['services' , function(services) {
    let service = {listCart:listCart,totalCart:totalCart,addQuant:addQuant,substQuant:substQuant,deleteCart:deleteCart,checkout:checkout};
    return service;

    function listCart(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'listCart', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function totalCart(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'totalCart', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function addQuant(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'addQuant', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function substQuant(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'substQuant', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function deleteCart(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'deleteCart', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

    function checkout(data) {
        return new Promise((resolve,reject) => {
            services.post('cart', 'checkout', data)
            .then(function(response) {
                resolve(response);
            });
        });
    };

}]);