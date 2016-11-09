'use strict';

var app = angular.module('oreshekNews', ['ngRoute']);

app.controller('AdministrativeController', ['$scope', function ($scope) {
    //pending implementation
}]);
app.controller('LoginController', ['$scope', '$http', '$location', 'loginService', function ($scope, $http, $location, loginService) {
    var userData = {};
    var username, password;

    $scope.showErrorNote = false;

    $scope.makeRequest = function () {
        username = $scope.username;
        password = $scope.password;

        $http({
            url: 'http://localhost:3000/login',
            method: "POST",
            data: { username: username,
                password: password }
        }).then(function (response) {
            if (response.status === 202) {
                $location.path('');
                $scope.showErrorNote = false;
                loginService.isLogin = true;
                loginService.username = username;
                loginService.avatarUrl = response.data.avatarUrl;
            }
        }, function (response) {
            loginService.isLogin = false;
            $scope.showErrorNote = true;
        });
    };
}]);
app.controller('MainController', ['$scope', '$rootScope', '$location', function ($rootScope, $scope, $location) {
    $scope.switchPage = function (nextPage) {
        switch (nextPage) {
            case 'main':
                $location.path('');
                break;
            case 'admin':
                $location.path('admin');
                break;
            case 'login':
                $location.path('login');
                break;
            case 'register':
                $location.path('register');
                break;
            default:
                $location.path('');
                break;
        }
    };
}]);
app.controller('OreshekNewsController', ['$scope', '$http', '$timeout', '$location', '$route', 'requestService', 'constService', 'isIEService', 'loginService', function ($scope, $http, $timeout, $location, $route, requestService, constService, isIEService, loginService) {
    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        bookmarks: true,
        spinnerGIF: true,
        spinnerCSS: true,
        userInfo: true,
        noBookmarksMsg: false,
        bookmarksHeading: true
    };

    if (loginService.isLogin === true) {
        $scope.hide.userInfo = false;
        setTimeout(function () {
            $(".user_info").addClass("user_info_slided");
        }, 400);
        $(".admin_page_ref").addClass("right_ref");
    } else {
        $scope.hide.userInfo = true;
        $(".admin_page_ref").removeClass("right_ref");
    }

    $scope.username = loginService.username;
    $scope.avatarUrl = loginService.avatarUrl;

    $scope.hideSpinner = function (hide) {
        var browser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : navigator.userAgent;

        if (isIEService.detect(browser)) {
            $scope.hide.spinnerGIF = hide;
        } else {
            $scope.hide.spinnerCSS = hide;
        }
    };

    /*$scope.hideSpinner(false);
      $scope.waitPageLoading = () => {
        $timeout(function() {
            $scope.hideSpinner(true);
        }, 5000);
    }
      $scope.waitPageLoading();*/

    var jsonPromise = requestService.makeRequest(constService.dataPath);
    jsonPromise.then(function (response) {
        $scope.sections = response.data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    });

    $scope.chooseSection = function () {
        var currentSection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Show all sections...';

        $(".select_button").blur();
        $scope.hideSpinner(false);
        $scope.hide.bookmarks = true;

        if (currentSection === 'Show all sections...') {
            $scope.hideSpinner(true);
            $scope.hide.currentSection = true;
            $scope.hide.sectionsList = false;
            $(".logo").addClass("logo_top");
        } else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            $scope.url = constService.articlesUrl + '?' + $.param({
                'api-key': constService.apiKey,
                'fq': 'news_desk:("' + currentSection + '")'
            });

            var promise = requestService.makeRequest($scope.url);
            promise.then(function (response) {
                $scope.hideSpinner(true);
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

                    if (loginService.isLogin === true) {
                        var data = {
                            username: $scope.username,
                            title: current.headline.main
                        };

                        $http({
                            url: 'http://localhost:3000/checkIfExists',
                            method: "POST",
                            data: { article: data }
                        }).then(function (response) {
                            if (response.data === "Data is already exists") {
                                current.bookmark = "./resources/min/bookmark_marked.png";
                            } else {
                                current.bookmark = "./resources/min/bookmark.png";
                            }
                        }, function (response) {});
                    }
                });
                $scope.hideSpinner(true);
                $(".logo").addClass("logo_top");
            });
        }
    };

    $scope.checkIfExists = function (article) {
        var data = {
            username: $scope.username,
            title: article.headline.main
        };
        console.log(data.title);

        $scope.isExists = false;

        $http({
            url: 'http://localhost:3000/checkIfExists',
            method: "POST",
            data: { article: data }
        }).then(function (response) {
            if (response.data === "Data is already exists") {
                console.log("exists");
                $scope.isExists = true;
            } else {
                console.log("not exists");
                $scope.isExists = false;
            }
        }, function (response) {});
    };

    $scope.showBookmarks = function () {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $scope.hide.bookmarks = false;
        $(".logo").addClass("logo_top");

        var url = 'http://localhost:3000/getBookmarks' + '/' + $scope.username;

        $http({
            url: url,
            method: "GET"
        }).then(function (response) {
            $scope.articles = response.data.bookmarks;
            if ($scope.articles.length === 0) {
                $scope.hide.noBookmarksMsg = false;
                $scope.hide.bookmarksHeading = true;
            } else {
                $scope.hide.noBookmarksMsg = true;
                $scope.hide.bookmarksHeading = false;
            }
            $scope.articles.forEach(function (current, index) {
                if (current.gallery) {
                    current.hideImage = false;
                } else {
                    current.hideImage = true;
                }
            });
        }, function (response) {});

        $scope.toTop();
    };

    $scope.logOut = function () {
        $(".user_info").removeClass("user_info_slided");
        $scope.hideAll();
        $(".admin_page_ref").removeClass("right_ref");

        setTimeout(function () {
            $http({
                url: 'http://localhost:3000/logout',
                method: "GET"
            }).then(function (response) {
                loginService.isLogin = false;
                $location.path('');
                $scope.hide.userInfo = true;
            }, function (response) {
                console.log('user was not loged out');
            });
        }, 400);
    };

    $scope.uploadAvatar = function () {
        loginService.avatarUrl = $scope.avatarUrl;
        $http({
            url: 'http://localhost:3000/uploadAvatar',
            method: "POST",
            data: { avatarUrl: loginService.avatarUrl }
        }).then(function (response) {}, function (response) {});
    };

    $scope.toTop = function () {
        $('html,body').scrollTop(0);
    };

    $scope.hideAll = function () {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $scope.hide.bookmarks = true;
        $(".logo").removeClass("logo_top");
    };

    $scope.addToBookmarks = function (article) {
        var data = {
            username: $scope.username,
            web_url: article.web_url,
            gallery: article.gallery,
            date: article.date,
            author: article.author,
            title: article.headline.main,
            lead_paragraph: article.lead_paragraph
        };

        $http({
            url: 'http://localhost:3000/addToBookmarks',
            method: "POST",
            data: { article: data }
        }).then(function (response) {
            if (response.status === "203") {}
        }, function (response) {});

        $(".more_info").addClass("bookmark_add_response");
        setTimeout(function () {
            $(".more_info").removeClass("bookmark_add_response");
        }, 400);
    };

    $scope.deleteFromBookmarks = function (article) {
        var data = {
            username: $scope.username,
            title: article.title
        };

        $http({
            url: 'http://localhost:3000/deleteFromBookmarks',
            method: "POST",
            data: { article: data }
        }).then(function (response) {}, function (response) {});

        var index = 0;
        for (var i = 0; i < $scope.articles.length; i++) {
            if ($scope.articles[i].title === article.title) {
                index = i;
                break;
            }
        }

        $(".more_info").addClass("bookmark_delete_response");
        $timeout(function () {
            $(".more_info").removeClass("bookmark_delete_response");
            $scope.articles.splice(index, 1);
            if ($scope.articles.length === 0) {
                $scope.hide.noBookmarksMsg = false;
                $scope.hide.bookmarksHeading = true;
            } else {
                $scope.hide.noBookmarksMsg = true;
                $scope.hide.bookmarksHeading = false;
            }
        }, 400);
    };
}]);
app.controller('PlayerController', ['$scope', '$rootScope', 'isIEService', function ($scope, $rootScope, isIEService) {
    $scope.setPlayer = function () {
        var browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

        if (!device.tablet() && !device.mobile() && !isIEService.detect(browser)) {
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
    };

    $scope.setPlayer();
}]);
app.controller('RegisterController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    var name, email, username, password, password2;

    $scope.showErrorNote = false;

    $scope.makeRequest = function () {
        name = $scope.name;
        email = $scope.email;
        username = $scope.username;
        password = $scope.password;
        password2 = $scope.password2;

        $http({
            url: 'http://localhost:3000/register',
            method: "POST",
            data: { name: name,
                email: email,
                username: username,
                password: password,
                password2: password2 }
        }).then(function (response) {
            $scope.showErrorNote = false;
            $location.path('login');
        }, function (response) {
            if (response.status === 401) {
                $scope.showErrorNote = true;
            }
        });
    };
}]);
app.service('constService', function () {
    return {
        apiKey: 'e0990f52eb2943e4a08c5feb52064044',
        articlesUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        commonUrl: 'http://www.nytimes.com/',
        dataPath: '../resources/data/sections.json'
    };
});
app.service('isIEService', function () {
    return {
        detect: function detect() {
            var browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : navigator.userAgent;

            if (/MSIE 10/i.test(browser) || /MSIE 9/i.test(browser) || /rv:11.0/i.test(browser) || /Edge\/\d./i.test(browser)) {
                return true;
            }
            return false;
        }
    };
});
app.service('loginService', function () {
    return {
        isLogin: false,
        username: "",
        avatarUrl: ""
    };
});
app.service('requestService', ['$http', function ($http) {
    return {
        makeRequest: function makeRequest(url) {
            return $http.get(url);
        }
    };
}]);

app.directive('bookmarks', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/bookmarks/bookmarks.html'
    };
});
app.directive('player', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/player/player.html'
    };
});
app.directive('news', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/news/news.html'
    };
});
app.directive('selectForm', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/selectForm/selectForm.html'
    };
});
app.directive('sectionList', function () {
    return {
        restrict: 'E',
        templateUrl: '../../directives/sectionList/sectionList.html'
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
    }).when('/login', {
        templateUrl: '../../directives/loginPage.html'
    }).when('/register', {
        templateUrl: '../../directives/registerPage.html'
    }).otherwise({ redirectTo: '/' });
});