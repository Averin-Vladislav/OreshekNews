app.controller('LoginController', ['$scope', '$location', function($scope, $location){
    var userData = {};
    
    $scope.makeRequest = () => {
        userData.email =  $scope.email;
        userData.username =  $scope.username;
        userData.password =  $scope.password;

        console.log('makeRequest() is working');
        $http({
            url: 'http://localhost:3000/message',
            method: "POST",
            data: { userData : userData }
        })
        .then(function(response) {
                // success
        }, 
        function(response) { // optional
                // failed
        });
    }
}]);