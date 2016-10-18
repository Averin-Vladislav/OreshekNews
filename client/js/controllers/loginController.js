app.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location){
    var userData = {};
    var username,
        password;

    $scope.showErrorNote = false;

    $scope.makeRequest = () => {
        username =  $scope.username;
        password =  $scope.password;

        $http({
            url: 'http://localhost:3000/login',
            method: "POST",
            data: { username : username,
                    password : password }
        })
        .then(function(response) {
            if(response.status === 202) {
                $location.path('');
                $scope.showErrorNote = false;
            }
        }, 
        function(response) { 
            $scope.showErrorNote = true;
        });
    }    
}]);