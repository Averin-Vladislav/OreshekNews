app.directive('selectForm', function () {
    return {
        require: '^OreshekNewsController',
        restrict: 'E',
        templateUrl: '../../directives/selectForm.html',
    };
});