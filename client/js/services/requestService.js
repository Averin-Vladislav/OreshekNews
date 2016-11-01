app.service('requestService', ['$http', function($http) {
    return {
        makeRequest: (url) => {
                          return $http.get(url);
                      }
    };
}]);
