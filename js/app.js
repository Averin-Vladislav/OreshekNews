let app = angular.module('oreshekNews', []);

app.controller('OreshekNewsController', ['$scope', '$http', '$timeout', 'requestService', ($scope, $http, $timeout, requestService) => {
    const apiKey = 'e0990f52eb2943e4a08c5feb52064044';
    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        spinnerGIF: true,
        spinnerCSS: true
    };

    function isIE() 
    {
        if (/MSIE 10/i.test(navigator.userAgent) || 
            /MSIE 9/i.test(navigator.userAgent) || 
            /rv:11.0/i.test(navigator.userAgent) ||
            /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }     
        return false;
    };

    function hideSpinner(hide) {
        if(isIE()) {
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

    if (!device.tablet() && !device.mobile() && !isIE()) {
        $(".player").mb_YTPlayer({
        videoURL:'https://www.youtube.com/watch?v=-ILqHSH4X_w',
        containment:'header',
        autoPlay:true,
        mute:true,
        startAt:10,
        opacity:1,
        showControls : false
        });
    } else {
        $("body").addClass("background");
    };

    $.getJSON('../resources/data/sections.json', function(data) {
        $scope.sections = data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    }) 

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
            let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
                'api-key': apiKey,
                'fq': `news_desk:("${currentSection}")`
            });

            let promise = requestService.makeRequest(url);
            promise.then(function (response) {
                hideSpinner(true);
                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = (`http://www.nytimes.com/${current.multimedia[0].url}`);
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

    

