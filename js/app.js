(function () {
    function isOldIE() 
    {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer
        {
            if(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) <= 9) {
                return true;
            } 
        }

        return false;
    }

    let app = angular.module('oreshekNews', []).controller('OreshekNewsController', ['$scope', '$http', ($scope, $http) => {
        if (!device.tablet() && !device.mobile()) {
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
		    //Если мобильние девайсы
	    };

        const apiKey = 'e0990f52eb2943e4a08c5feb52064044';
        $scope.hideCurrentSection = true;
        $scope.hideSectionsList = true;
        $scope.hideImage = false;
        $scope.showSpinnerGIF = false;
        $scope.showSpinnerCSS = false;

        $scope.sections = ['Adventure Sports', 'Arts & Leisure', 'Arts', 'Automobiles',
                    'Blogs', 'Books', 'Booming', 'Business Day', 'Business',
                    'Cars', 'Circuits', 'Classifieds', 'Connecticut', 'Crosswords & Games', 'Culture',
                    'DealBook', 'Dining',
                    'Editorial', 'Education', 'Energy', 'Entrepreneurs', 'Environment', 'Escapes',
                    'Fashion & Style', 'Fashion', 'Favorites', 'Financial', 'Flight', 'Food', 'Foreign',
                    'Generations', 'Giving', 'Global Home',
                    'Health & Fitness', 'Health', 'Home & Garden', 'Home',
                    'Jobs',
                    'Key',
                    'Letters', 'Long Island',
                    'Magazine', 'Market Place', 'Media', 'Men\'s Health', 'Metro', 'Metropolitan', 'Movies', 'Museums',
                    'National', 'Nesting',
                    'Obits', 'Obituaries', 'Obituary', 'OpEd', 'Opinion', 'Outlook',
                    'Personal Investing', 'Personal Tech', 'Play', 'Politics',
                    'Regionals', 'Retail', 'Retirement',
                    'Science', 'Small Business', 'Society', 'Sports', 'Style', 'Sunday Business', 'Sunday Review', 'Sunday Styles',
                    'T Magazine', 'T Style', 'Technology', 'Teens', 'Television', 'The Arts', 'The Business of Green',
                    'The City Desk', 'The City', 'The Marathon', 'The Millennium', 'The Natural World',
                    'The Upshot', 'The Weekend', 'The Year in Pictures',
                    'Theater', 'Then & Now', 'Thursday Styles', 'Times Topics', 'Travel',
                    'U.S.', 'Universal', 'Upshot', 'UrbanEye',
                    'Vacation',
                    'Washington', 'Wealth', 'Weather', 'Week in Review', 'Week', 'Weekend',
                    'Westchester', 'Wireless Living', 'Women\'s Health', 'Working', 'Workplace', 'World',
                    'Your Money',
                    'Show all sections...'];

        $scope.sectionsList = $scope.sections.slice(0, $scope.sections.length - 1);

        $scope.chooseSection = (currentSection = 'Show all sections...') => {
        
            if(isOldIE()) {
                $scope.showSpinnerGIF = true;
            }
            else {
                $scope.showSpinnerCSS = true;
            }

            if (currentSection === 'Show all sections...') {
                if(isOldIE()) {
                    $scope.showSpinnerGIF = false;
                }
                else {
                    $scope.showSpinnerCSS = false;
                }
                $scope.hideCurrentSection = true;
                $scope.hideSectionsList = false;
            }
            else {
                $scope.hideCurrentSection = false;
                $scope.hideSectionsList = true;
                let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
                url += '?' + $.param({
                    'api-key': apiKey,
                    'fq': `news_desk:("${currentSection}")`
                });

                $http.get(url)
                .then(function (response) {
            
                    if(isOldIE()) {
                        $scope.showSpinnerGIF = false;
                    }
                    else {
                        $scope.showSpinnerCSS = false;
                    }

                    $scope.articles = response.data.response.docs;
                    $scope.articles.forEach(function (current, index) {
                        if (current.multimedia.length) {
                            current.gallery = ('http://www.nytimes.com/' + current.multimedia[0].url);
                            $scope.hideImage = false;
                        }
                        else {
                            $scope.hideImage = true;
                            //current.gallery = 'resources/min/no_image.png';
                        }
                        current.pub_date = current.pub_date.slice(0, 10);
                    });

                    if(isOldIE()) {
                        $scope.showSpinnerGIF = false;
                    }
                    else {
                        $scope.showSpinnerCSS = false;
                    }
                });
            }
        };

        $scope.hideAll = () => {
            $scope.hideCurrentSection = true;
            $scope.hideSectionsList = true;
        };
    }]);
}());
