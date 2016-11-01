app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var name,
        email,
        username,
        password,
        password2;

    $scope.showErrorNote = false;

    $scope.makeRequest = () => {
        name =  $scope.name;
        email =  $scope.email;
        username =  $scope.username;
        password =  $scope.password;
        password2 =  $scope.password2;

        $http({
            url: 'http://localhost:3000/register',
            method: "POST",
            data: { name : name,
                    email : email,
                    username : username,
                    password : password,
                    password2 : password2 }
        })
        .then(function(response) {
                $scope.showErrorNote = false;
                $location.path('login');
        }, 
        function(response) { 
                if(response.status === 401) {
                    $scope.showErrorNote = true;
                }
        });
    }    
}]);