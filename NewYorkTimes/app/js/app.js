(function () {
    var app = angular.module('oreshekNews', []);
    app.controller('OreshekNewsController', function () {
        this.currentSection = 0;
        this.chooseSection = function (currentSection) {
            console.log(currentSection);
        };
    });
 
    /*var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "e0990f52eb2943e4a08c5feb52064044"
    });
    $.ajax({
        url: url,
        method: 'GET',
    }).done(function (result) {
        console.log(result);
    }).fail(function (err) {
        throw err;
    });*/
}());
