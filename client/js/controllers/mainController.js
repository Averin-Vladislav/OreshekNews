app.controller('MainController', ['$scope', '$location', ($scope, $location) => {

    $scope.switchPage = (nextPage) => {
        switch(nextPage) {
            case 'main' :     $location.path('');
                              break;
            case 'admin' :    $location.path('admin');
                              break;
            case 'login' :    $location.path('login');
                              break;                   
            case 'register' : $location.path('register');
                              break; 
            default :         $location.path('');
                              break;
        }
    };
}]);