describe('constService', function() {
    var constService;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_constService_) {
        constService = _constService_;
    }));

    describe('#constants object initialization', function() {
        /*it('should not to be changed', function() {
            constService.apiKey = '123';
            console.log(constService.apiKey);
        });*/
        it('should initialize apiKey correctly', function() {
            expect(constService.apiKey).toEqual('e0990f52eb2943e4a08c5feb52064044');
        });
        it('should initialize articlesUrl correctly', function() {
            expect(constService.articlesUrl).toEqual('https://api.nytimes.com/svc/search/v2/articlesearch.json');
        });
        it('should initialize commonUrl correctly', function() {
            expect(constService.commonUrl).toEqual('http://www.nytimes.com/');
        });
        it('should initialize dataPath correctly', function() {
            expect(constService.dataPath).toEqual('../resources/data/sections.json');
        });
    });
});