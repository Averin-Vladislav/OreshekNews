let app = angular.module('oreshekNews', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.show = {
        mainPage: true,
        adminPage: false,
        button: true
    };

    $scope.nextPage = 'Admin page';
    $scope.currentPage = 'Main page';

    $scope.switchPage = (currentPage) => {
        if(currentPage === 'Main page') {
            $scope.show.mainPage = false;
            $scope.show.adminPage = true;
            $scope.nextPage = 'back to Main page';
            $scope.currentPage = 'Admin page';
        }
        else {
            $scope.show.mainPage = true;
            $scope.show.adminPage = false;
            $scope.nextPage = 'Admin page';
            $scope.currentPage = 'Main page';
        }
    };
}]);

app.controller('OreshekNewsController', ['$scope', 
                                         '$http', 
                                         '$timeout', 
                                         'requestService', 
                                         'constService', 
                                         'getJSONService',
                                         ($scope, $http, $timeout, requestService, constService, getJSONService) => {
    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        spinnerGIF: true,
        spinnerCSS: true
    };

    $scope.isIE = () => {
        if (/MSIE 10/i.test(navigator.userAgent) || 
            /MSIE 9/i.test(navigator.userAgent) || 
            /rv:11.0/i.test(navigator.userAgent) ||
            /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }     
        return false;
    };

    let hideSpinner = (hide) => { 
        if($scope.isIE()) {
            $scope.hide.spinnerGIF = hide;
        }
        else {
            $scope.hide.spinnerCSS = hide;
        }
    }

    hideSpinner(false);
    $timeout(function() {
        hideSpinner(true);
    }, 5000);

    getJSONService.getInfo(constService.dataPath, (data) => {
        $scope.sections = data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    });

    $scope.chooseSection = (currentSection = 'Show all sections...') => {
        $(".select_button").blur();
        hideSpinner(false);

        if (currentSection === 'Show all sections...') {
            hideSpinner(true);
            $scope.hide.currentSection = true;
            $scope.hide.sectionsList = false;
        }
        else {
            $scope.hide.currentSection = false;
            $scope.hide.sectionsList = true;
            constService.articlesUrl += '?' + $.param({
                'api-key': constService.apiKey,
                'fq': `news_desk:("${currentSection}")`
            });

            let promise = requestService.makeRequest(constService.articlesUrl);
            promise.then(function (response) {
                hideSpinner(true);
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
                hideSpinner(true);
                $(".logo").addClass("logo_top");
            });
        }
    };

    $scope.hideAll = () => {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $(".logo").removeClass("logo_top");
    };
}]);

app.controller('AdministrativeController', ['$scope', function($scope) {
    //pending implementation
}]);


    

