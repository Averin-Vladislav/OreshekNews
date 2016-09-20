app.service('requestService', ['$http', function($http) {
    var reqService = {};
    
    reqService.makeRequest = function(url) {
        return $http.get(url);
    }

    return reqService;
}]);
