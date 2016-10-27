app.controller('LoginController', ['$scope', 
                                   '$http', 
                                   '$location', 
                                   'loginService', 
                                   function($scope, $http, $location, loginService){
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
                loginService.isLogin = true;
                loginService.username = username;
                loginService.avatarUrl = response.data.avatarUrl;
            }
        }, 
        function(response) { 
            loginService.isLogin = false;
            $scope.showErrorNote = true;
        });
    }  
}]);