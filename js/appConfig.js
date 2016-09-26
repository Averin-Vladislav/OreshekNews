app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../../directives/mainPage.html'
    })
    .when('/admin', {
        templateUrl: '../../directives/adminPage.html'
    })
    .otherwise({ redirectTo: '/'});
});