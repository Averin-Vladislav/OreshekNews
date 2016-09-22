'use strict';

var app = angular.module('oreshekNews', []);

app.controller('OreshekNewsController', ['$scope', '$http', '$timeout', 'requestService', function ($scope, $http, $timeout, requestService) {
    var apiKey = 'e0990f52eb2943e4a08c5feb52064044';
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
        // isolate to controller
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

    $.getJSON('../resources/data/sections.json', function (data) {
        // make service
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
        } else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
                'api-key': apiKey,
                'fq': 'news_desk:("' + currentSection + '")'
            });

            var promise = requestService.makeRequest(url);
            promise.then(function (response) {
                hideSpinner(true);
                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = 'http://www.nytimes.com/' + current.multimedia[0].url;
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

    $scope.hideAll = function () {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $(".logo").removeClass("logo_top");
    };
}]);

app.service('requestService', ['$http', function ($http) {
    var reqService = {};

    reqService.makeRequest = function (url) {
        return $http.get(url);
    };

    return reqService;
}]);

app.directive('news', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/news.html'
    };
});
app.directive('player', function () {
    return {
        require: '^OreshekNewsController',
        restrict: 'E',
        templateUrl: '../../directives/player.html',
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
        templateUrl: '../../directives/sectionList.html'
    };
});
app.directive('selectForm', function () {
    return {
        require: '^OreshekNewsController',
        restrict: 'E',
        templateUrl: '../../directives/selectForm.html'
    };
});
app.directive('spinner', function () {
    return {
        require: ['$timeout', '^OreshekNewsController'],
        restrict: 'E',
        templateUrl: '../../directives/spinner.html'
    };
});