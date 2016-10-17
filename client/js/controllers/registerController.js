app.controller('RegisterController', ['$scope', '$http', function($scope, $http) {
    var name,
        email,
        username,
        password,
        password2;

    $scope.makeRequest = () => {
        name =  $scope.name;
        email =  $scope.email;
        username =  $scope.username;
        password =  $scope.password;
        password2 =  $scope.password2;

        console.log('makeRequest() is working');
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
                // success
        }, 
        function(response) { // optional
                // failed
        });
    }    
}]);