app.controller('OreshekNewsController', ['$scope', 
                                         '$http', 
                                         '$timeout',
                                         '$location', 
                                         'requestService', 
                                         'constService', 
                                         'isIEService',
                                         'loginService',
                                         ($scope, $http, $timeout, $location, requestService, constService, isIEService, loginService) => {
    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        spinnerGIF: true,
        spinnerCSS: true,
        userInfo: true
    };

    if(loginService.isLogin === true) {
        $scope.hide.userInfo = false;
    }
    else {
        $scope.hide.userInfo = true;
    }

    $scope.username = loginService.username;
    $scope.avatarUrl = loginService.avatarUrl;

    $scope.hideSpinner = (hide, browser = navigator.userAgent) => { 
        if(isIEService.detect(browser)) {
            $scope.hide.spinnerGIF = hide;
        }
        else {
            $scope.hide.spinnerCSS = hide;
        }
    }

    $scope.hideSpinner(false);

    $scope.waitPageLoading = () => {
        $timeout(function() {
            $scope.hideSpinner(true);
        }, 5000);
    }

    $scope.waitPageLoading();

    let jsonPromise = requestService.makeRequest(constService.dataPath);
    jsonPromise.then(function (response) {
        $scope.sections = response.data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    });

    $scope.chooseSection = (currentSection = 'Show all sections...') => {
        $(".select_button").blur();
        $scope.hideSpinner(false);

        if (currentSection === 'Show all sections...') {
            $scope.hideSpinner(true);
            $scope.hide.currentSection = true;
            $scope.hide.sectionsList = false;
            $(".logo").addClass("logo_top");
        }
        else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            $scope.url = constService.articlesUrl + '?' + $.param({
                'api-key': constService.apiKey,
                'fq': `news_desk:("${currentSection}")`
            });

            let promise = requestService.makeRequest($scope.url);
            promise.then(function (response) {
                $scope.hideSpinner(true);
                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = (`${constService.commonUrl}${current.multimedia[0].url}`);                      
                        current.hideImage = false;
                    }
                    else {
                        current.hideImage = true;
                    }
                    current.date = `${current.pub_date.slice(0, 10)}`;
                    current.author = (current.byline && current.byline.original) ? `${current.byline.original}` : ``;
                });
                $scope.hideSpinner(true);
                $(".logo").addClass("logo_top");
            });
        }
    };

    $scope.logOut = () => {
        $http({
            url: 'http://localhost:3000/logout',
            method: "GET"
        })
        .then(function(response) {
            loginService.isLogin = false;
            $location.path('');
            $scope.hide.userInfo = true;
        }, 
        function(response) { 
            console.log('user was not loged out');
        });
    }

    $scope.uploadAvatar = () => {
        loginService.avatarUrl = $scope.avatarUrl;
        console.log(loginService.avatarUrl);
        $http({
            url: 'http://localhost:3000/uploadAvatar',
            method: "POST",
            data: { avatarUrl : loginService.avatarUrl}
        })
        .then(function(response) {
        }, 
        function(response) { 
        });
    }  

    $scope.toTop = () => {
        $('html,body').scrollTop(0);
    }

    $scope.hideAll = () => {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $(".logo").removeClass("logo_top");
    };

    $scope.addToBookmarks = (article) => {
        console.log(article.headline.main);
        $http({
            url: 'http://localhost:3000/addToBookmarks',
            method: "POST",
            data: { article : article}
        })
        .then(function(response) {
        }, 
        function(response) { 
        });
    } 
}]);