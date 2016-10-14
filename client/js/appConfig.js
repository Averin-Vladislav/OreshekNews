app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '../../directives/mainPage.html'
    })
    .when('/admin', {
        templateUrl: '../../directives/adminPage.html'
    })
    .when('/login', {
        templateUrl: '../../directives/loginPage.html'
    })
    .when('/register', {
        templateUrl: '../../directives/registerPage.html'
    })
    .otherwise({ redirectTo: '/'});
});