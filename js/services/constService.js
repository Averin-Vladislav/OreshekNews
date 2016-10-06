app.service('constService', function() {
    return {
        apiKey: 'e0990f52eb2943e4a08c5feb52064044',
        articlesUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
        commonUrl: 'http://www.nytimes.com/',
        dataPath: '../resources/data/sections.json'
    }
});