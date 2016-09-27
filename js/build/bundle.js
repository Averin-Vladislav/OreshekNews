'use strict';

var app = angular.module('oreshekNews', ['ngRoute']);

app.controller('MainController', ['$scope', '$location', function ($scope, $location) {
    $scope.nextPage = 'Admin page';
    $scope.currentPage = 'Main page';

    $scope.switchPage = function (currentPage) {
        if (currentPage === 'Main page') {
            $scope.nextPage = 'back to Main page';
            $scope.currentPage = 'Admin page';
            $location.path('admin');
        } else {
            $scope.nextPage = 'Admin page';
            $scope.currentPage = 'Main page';
            $location.path('');
        }
    };
}]);

app.controller('OreshekNewsController', ['$scope', '$http', '$timeout', '$location', 'requestService', 'constService', 'getJSONService', function ($scope, $http, $timeout, $location, requestService, constService, getJSONService) {

    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        spinnerGIF: true,
        spinnerCSS: true
    };

    $scope.isIE = function () {
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    };

    var hideSpinner = function hideSpinner(hide) {
        if ($scope.isIE()) {
            $scope.hide.spinnerGIF = hide;
        } else {
            $scope.hide.spinnerCSS = hide;
        }
    };

    hideSpinner(false);
    $timeout(function () {
        hideSpinner(true);
    }, 5000);

    getJSONService.getInfo(constService.dataPath, function (data) {
        $scope.sections = data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    });

    $scope.chooseSection = function () {
        var currentSection = arguments.length <= 0 || arguments[0] === undefined ? 'Show all sections...' : arguments[0];

        $(".select_button").blur();
        hideSpinner(false);

        if (currentSection === 'Show all sections...') {
            hideSpinner(true);
            $scope.hide.currentSection = true;
            $scope.hide.sectionsList = false;
            $(".logo").addClass("logo_top");
        } else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            var url = constService.articlesUrl + '?' + $.param({
                'api-key': constService.apiKey,
                'fq': 'news_desk:("' + currentSection + '")'
            });

            var promise = requestService.makeRequest(url);
            promise.then(function (response) {
                hideSpinner(true);
                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = '' + constService.commonUrl + current.multimedia[0].url;
                        current.hideImage = false;
                    } else {
                        current.hideImage = true;
                    }
                    current.date = '' + current.pub_date.slice(0, 10);
                    current.author = current.byline && current.byline.original ? '' + current.byline.original : '';
                });
                hideSpinner(true);
                $(".logo").addClass("logo_top");
            });
        }
    };

    $scope.toTop = function () {
        $('html,body').scrollTop(0);
    };

    $scope.hideAll = function () {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $(".logo").removeClass("logo_top");
    };
}]);

app.controller('AdministrativeController', ['$scope', function ($scope) {
    //pending implementation
}]);

app.service('constService', function () {
    var constants = {
        apiKey: 'e0990f52eb2943e4a08c5feb52064044',
        articlesUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        commonUrl: 'http://www.nytimes.com/',
        dataPath: '../resources/data/sections.json'
    };

    return constants;
});
app.service('getJSONService', function () {
    var getJSONService = {};

    getJSONService.getInfo = function (pathToFile, callback) {
        $.getJSON(pathToFile, callback);
    };

    return getJSONService;
});
app.service('requestService', ['$http', function ($http) {
    var requestService = {};

    requestService.makeRequest = function (url) {
        return $http.get(url);
    };

    return requestService;
}]);

app.directive('news', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/news/news.html'
    };
});
app.directive('player', function () {
    return {
        require: '^OreshekNewsController',
        restrict: 'E',
        templateUrl: '../../directives/player/player.html',
        controller: function controller($scope) {
            if (!device.tablet() && !device.mobile() && !$scope.isIE()) {
                $(".player").mb_YTPlayer({
                    videoURL: 'https://www.youtube.com/watch?v=-ILqHSH4X_w',
                    containment: 'header',
                    autoPlay: true,
                    mute: true,
                    startAt: 10,
                    opacity: 1,
                    showControls: false
                });
            } else {
                $("body").addClass("background");
            };
        }
    };
});
app.directive('sectionList', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/sectionList/sectionList.html'
    };
});
app.directive('selectForm', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/selectForm/selectForm.html'
    };
});
app.directive('spinner', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/spinner/spinner.html'
    };
});
app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '../../directives/mainPage.html'
    }).when('/admin', {
        templateUrl: '../../directives/adminPage.html'
    }).otherwise({ redirectTo: '/' });
});