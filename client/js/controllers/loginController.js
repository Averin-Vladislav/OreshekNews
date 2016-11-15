app.controller('LoginController', ['$scope', 
                                   '$http', 
                                   '$location', 
                                   'loginService', 
                                   function($scope, $http, $location, loginService){
    var userData = {};
    var username,
        password;

    $scope.showErrorNote = false;

    $scope.localLogin = () => {
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
                console.log(response.data.avatarUrl);
            }
        }, 
        function(response) { 
            loginService.isLogin = false;
            $scope.showErrorNote = true;
        });
    }

    $scope.facebookLogin = () => {
        $http({
            url: 'http://localhost:3000/auth/facebook',
            method: "GET"
        })
        .then(function(response) {
            console.log(response.data.username);
        }, 
        function(response) { 
            console.log('fail facebook login');
        });
    } 

    $scope.googleLogin = () => {
        $http({
            url: 'http://localhost:3000/auth/google',
            method: "GET"
        })
        .then(function(response) {
            console.log("success google login");
        },
        function(response) {
            console.log("failure google login");
        });
    }
}]);