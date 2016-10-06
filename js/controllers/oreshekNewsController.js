app.controller('OreshekNewsController', ['$scope', '$compile', 
                                         '$rootScope',
                                         '$http', 
                                         '$timeout',
                                         '$location', 
                                         'requestService', 
                                         'constService', 
                                         'getJSONService',
                                         'isIEService',
                                         ($scope, $compile, $rootScope, $http, $timeout, $location, requestService, constService, getJSONService, isIEService) => {

    /*var  element = $compile('<sectionList></sectionList>')($scope);
    console.log(element[0].outerHTML);*/

    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        spinnerGIF: true,
        spinnerCSS: true
    };

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

    getJSONService.getInfo(constService.dataPath, (data) => {
        $scope.sections = data.sections;
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
            let url = constService.articlesUrl + '?' + $.param({
                'api-key': constService.apiKey,
                'fq': `news_desk:("${currentSection}")`
            });

            let promise = requestService.makeRequest(url);
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

    $scope.toTop = () => {
        $('html,body').scrollTop(0);
    }

    $scope.hideAll = () => {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
        $(".logo").removeClass("logo_top");
    };
}]);