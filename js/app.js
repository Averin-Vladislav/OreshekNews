function isIE() 
{
    if (/MSIE 10/i.test(navigator.userAgent) || 
        /MSIE 9/i.test(navigator.userAgent) || 
        /rv:11.0/i.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)) {
        return true;
    }     
    return false;
}

let app = angular.module('oreshekNews', []);

app.controller('OreshekNewsController', ['$scope', '$http', 'requestService', ($scope, $http, requestService) => {
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

    const apiKey = 'e0990f52eb2943e4a08c5feb52064044';
    $scope.hide = {
        currentSection: true,
        sectionsList: true,
        image: false,
        spinnerGIF: true,
        spinnerCSS: true
    };

    $.getJSON('../resources/data/sections.json', function(data) {
        $scope.sections = data.sections;
        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);
    }) 

    $scope.chooseSection = (currentSection = 'Show all sections...') => {
        $("select_button").blur();

        if(isIE()) {
            $scope.hide.spinnerGIF = false;
        }
        else {
            $scope.hide.spinnerCSS = false;
        }

        if (currentSection === 'Show all sections...') {
            if(isIE()) {
                $scope.hide.spinnerGIF = true;
            }
            else {
                $scope.hide.spinnerCSS = true;
            }
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
                if(isIE()) {
                    $scope.hide.spinnerGIF = true;
                }
                else {
                    $scope.hide.spinnerCSS = true;
                }

                $scope.articles = response.data.response.docs;
                $scope.articles.forEach(function (current, index) {
                    if (current.multimedia.length) {
                        current.gallery = ('http://www.nytimes.com/' + current.multimedia[0].url);
                        $scope.hide.image = false;
                    }
                    else {
                        $scope.hide.image = true;
                        //current.gallery = 'resources/min/no_image.png';
                    }
                    current.pub_date = current.pub_date.slice(0, 10);
                });

                if(isIE()) {
                    $scope.hide.spinnerGIF = true;
                }
                else {
                    $scope.hide.spinnerCSS = true;
                }
            });
        }
    };

    $scope.hideAll = () => {
        $scope.hide.currentSection = true;
        $scope.hide.sectionsList = true;
    };
}]);

    

