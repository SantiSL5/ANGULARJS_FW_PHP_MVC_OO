arcadeshop.factory("services", ['$http','$q', function ($http, $q) {
    var serviceBase = '/backend/index.php?page=';
    var obj = {};

        obj.get = function (module, functi) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'GET',
                  url: serviceBase + module + '&op=' + functi
              }).success(function(data, status, headers, config) {
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.get = function (module, functi, dada) {
            var defered=$q.defer();
            var promise=defered.promise;
            $http({
                  method: 'GET',
                  url: serviceBase + module + '&op=' + functi + '&arg=' + dada
              }).success(function(data, status, headers, config) {
                 defered.resolve(data);
              }).error(function(data, status, headers, config) {
                 defered.reject(data);
              });
            return promise;
        };

        obj.post = function (module, functi, dada) {
          var defered=$q.defer();
          var promise=defered.promise;
          $http({
                method: 'POST',
                url: serviceBase + module + '&op=' + functi,
                data: dada
            }).success(function(data, status, headers, config) {
      	        //console.log(serviceBase + module + '&op=' + functi);
              //debugger;
               defered.resolve(data);
            }).error(function(data, status, headers, config) {
               defered.reject(data);
            });
          return promise;
        };

        obj.postfile = function (url) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http({
                  method: 'POST',
                  url: url
              }).success(function(response, status, headers, config) {
                 defered.resolve(response);
              }).error(function(error, status, headers, config) {
                 defered.reject(error);
              });
            return promise;
        };
        
    return obj;
}]);
