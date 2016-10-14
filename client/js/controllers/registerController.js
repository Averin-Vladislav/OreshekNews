app.controller('RegisterController', ['$scope', '$http', function($scope, $http) {
    $scope.makeRequest = () => {
        console.log('makeRequest() is working');
        $http({
            url: 'http://localhost:3000/message',
            method: "POST",
            data: { message : 'Hi, i\'m a client!' }
        })
        .then(function(response) {
                // success
        }, 
        function(response) { // optional
                // failed
        });
    }    
}]);