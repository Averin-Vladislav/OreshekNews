 app.directive('spinner', function() {
    return {
        require: ['$timeout', '^OreshekNewsController'],
        restrict: 'E',
        templateUrl: '../../directives/spinner.html',
    };
});