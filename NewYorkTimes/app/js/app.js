(function () {
    var app = angular.module('oreshekNews', []).controller('OreshekNewsController', ['$scope', '$http', function ($scope, $http) {
        var apiKey = "e0990f52eb2943e4a08c5feb52064044";

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

        $scope.chooseSection = function (currentSection) {
            if (currentSection === 'Show all sections...') {
                $scope.allSections = $scope.sections;
            }
            else {
                var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
                url += '?' + $.param({
                    'api-key': apiKey,
                    'fq': "news_desk:(\"" + currentSection + "\")"
                });

                $http.get(url)
                .then(function (response) {
                    console.log(response.data.response.docs);
                    $scope.articles = response.data.response.docs;
                    $scope.articles.forEach(function (current, index) {
                        if (current.multimedia.length) {
                            current.gallery = ('http://www.nytimes.com/' + current.multimedia[0].url);
                        }
                    });
                });
            }
        };
    }]);
}());
