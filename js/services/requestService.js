app.service('requestService', ['$http', function($http) {
    let requestService = {};
    
    requestService.makeRequest = (url) => {
        return $http.get(url);
    }

    return requestService;
}]);
