describe('requestService', function() {
    var $rootScope, $httpBackend, requestService;

    beforeEach(module('oreshekNews'));
    
    beforeEach(inject(function(_$rootScope_, _$httpBackend_, _requestService_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        requestService = _requestService_;

        $httpBackend.whenGET('../resources/data/sections.json')
                    .respond({"sections":['Arts', 'Blogs', 'Movies']});
        $httpBackend.whenGET('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e0990f52eb2943e4a08c5feb52064044&fq=news_desk%3A(%22Cars%22)')
                    .respond({
                                response: {
                                            docs: [{
                                                        multimedia: [{
                                                            url: '123'
                                                        }],
                                                        pub_date: '2016-09-23T00:00:00Z',
                                                        byline: {
                                                            original: 'By PAM HOUSTON' 
                                                        }
                                                   },
                                                   {
                                                        multimedia: [{
                                                            url: '231'
                                                        }],
                                                        pub_date: '2016-09-23T00:00:00Z',
                                                        byline: {
                                                            original: 'By JOHN LENNON' 
                                                        }
                                                   },
                                                   {
                                                        multimedia: [],
                                                        pub_date: '2016-09-23T00:00:00Z',
                                                   }]
                                          } 
                            });    
    }));

    describe('#\'makeRequest\' function', function() {
        it('should retrieve correct count of articles', function() {
            requestService.makeRequest('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e0990f52eb2943e4a08c5feb52064044&fq=news_desk%3A(%22Cars%22)')
                .then(function(response) {
                $rootScope.info = response.data.response.docs;
            });

            $httpBackend.flush();
            expect($rootScope.info.length).toEqual(3);
        });

        it('should retrieve correct data of article', function() {
            requestService.makeRequest('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e0990f52eb2943e4a08c5feb52064044&fq=news_desk%3A(%22Cars%22)')
                .then(function(response) {
                $rootScope.info = response.data.response.docs;
            });

            $httpBackend.flush();
            expect($rootScope.info[0].byline.original).toEqual('By PAM HOUSTON');
            expect($rootScope.info[1].multimedia[0].url).toEqual('231');     
            expect($rootScope.info[2].pub_date).toEqual('2016-09-23T00:00:00Z');          
        });

        it('should retrieve correct count of sections', function() {
            requestService.makeRequest('../resources/data/sections.json')
                .then(function(response) {
                $rootScope.info = response.data.sections;
            });

            $httpBackend.flush();
            expect($rootScope.info.length).toEqual(3);
        });

        it('should retrieve correct data of section', function() {
            requestService.makeRequest('../resources/data/sections.json')
                .then(function(response) {
                $rootScope.info = response.data.sections;
            });

            $httpBackend.flush();
            expect($rootScope.info[0]).toEqual('Arts');
            expect($rootScope.info[1]).toEqual('Blogs');     
            expect($rootScope.info[2]).toEqual('Movies');  
        });
    });
});