app.controller('MainController', ['$scope', '$location', ($scope, $location) => {
    $scope.nextPage = 'Admin page';
    $scope.currentPage = 'Main page';

    $scope.switchPage = (currentPage) => {
        if(currentPage === 'Main page') {
            $scope.nextPage = 'back to Main page';
            $scope.currentPage = 'Admin page';
            $location.path('admin');
        }
        else {
            $scope.nextPage = 'Admin page';
            $scope.currentPage = 'Main page';
            $location.path('');
        }
    };
}]);