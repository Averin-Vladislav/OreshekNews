describe('OreshekNewsController', () => {
    var $scope, $httpBackend, $timeout, $location, $controller, $http, requestService;

    var checkBrowserVersion = function() {
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    var isIE = checkBrowserVersion();

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$rootScope_, 
                               _$httpBackend_, 
                               _$timeout_, 
                               _$location_, 
                               _$controller_, 
                               _$http_,
                               _requestService_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        $location = _$location_;
        $http = _$http_;
        requestService = _requestService_;

        controller = _$controller_('OreshekNewsController', {
            $scope : $rootScope
        });

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

    describe('#variables', function() {
        it('should initialize \'currentSection\' and \'sectionsList\' fields of \'hide\' object', function() {
            expect($rootScope.hide.currentSection).toBeTruthy();
            expect($rootScope.hide.sectionsList).toBeTruthy();
        });

        it('should initialize \'currentSection\' and \'sectionsList\' fields of \'hide\' object', function() {
            expect($rootScope.hide.currentSection).toBeTruthy();
            expect($rootScope.hide.sectionsList).toBeTruthy();

            if(isIE) {
                expect($rootScope.hide.spinnerGIF).toBeFalsy();
                expect($rootScope.hide.spinnerCSS).toBeTruthy();
            }
            else {
                expect($rootScope.hide.spinnerGIF).toBeTruthy();
                expect($rootScope.hide.spinnerCSS).toBeFalsy();
            }
        });
    });

    describe('#\'hideSpinner()\' function', function() {
        it('should hide spinner if browser is IE', function() {
            $rootScope.hideSpinner(true, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)');
            expect($rootScope.hide.spinnerGIF).toBeTruthy();
        });
        it('should hide spinner if browser is not IE', function() {
            $rootScope.hideSpinner(true, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36');           
            expect($rootScope.hide.spinnerCSS).toBeTruthy();
        });
    });

    describe('#spinner', function() {
        it('should hide after 5 seconds page has been loaded', function() {
            if(isIE) {
                expect($rootScope.hide.spinnerGIF).toBeFalsy();
            }
            else {
                expect($rootScope.hide.spinnerCSS).toBeFalsy();
            }

            $rootScope.waitPageLoading();
            $timeout.flush(5001);

            if(isIE) {
                expect($rootScope.hide.spinnerGIF).toBeTruthy();
            }
            else {
                expect($rootScope.hide.spinnerCSS).toBeTruthy();
            }
        });
    });

    describe('\'#chooseSection\' function', function() {        
        it('should hide spinner after function will be called', function() {
            $rootScope.chooseSection('Show all sections...');

            if(isIE) {
                expect($rootScope.hide.spinnerGIF).toBeTruthy();
            }
            else {
                expect($rootScope.hide.spinnerCSS).toBeTruthy();
            }
        });

        it('should hide \'currentSection\' and show \'sectionsList\' when user selects \'Show all sections...\'', function() {
            $rootScope.chooseSection('Show all sections...');
            expect($rootScope.hide.currentSection).toBeTruthy();
            expect($rootScope.hide.sectionsList).toBeFalsy();
            $rootScope.chooseSection();
            expect($rootScope.hide.currentSection).toBeTruthy();
            expect($rootScope.hide.sectionsList).toBeFalsy();
        });

        it('should show \'currentSection\' and hide \'sectionsList\' when user selects one of the sections', function() {
            $rootScope.chooseSection('Arts');
            expect($rootScope.hide.currentSection).toBeFalsy();
            expect($rootScope.hide.sectionsList).toBeTruthy();
        });

        it('should compose corrent url when user selects one of the sections', function() {
            $rootScope.chooseSection('Cars');
            expect($rootScope.url).toEqual('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e0990f52eb2943e4a08c5feb52064044&fq=news_desk%3A(%22Cars%22)');
            
            $rootScope.chooseSection('Movies');
            expect($rootScope.url).toEqual('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e0990f52eb2943e4a08c5feb52064044&fq=news_desk%3A(%22Movies%22)');
        });

        it('should return corrent number of articles', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles.length).toEqual(3);
        });

        it('should hide image if multimedia property length is equal to 0', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles[2].hideImage).toBeTruthy();
        });

        it('should show image if multimedia property length is equal to 0', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles[0].hideImage).toBeFalsy();
            expect($rootScope.articles[1].hideImage).toBeFalsy();
        });

        it('should set correct publish date', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles[0].date).toEqual('2016-09-23');
        });

        it('should set correct author', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles[1].author).toEqual('By JOHN LENNON');
        });

        it('should not specify author if object haven\'t byline property', function() {
            $rootScope.chooseSection('Cars');
            $httpBackend.flush();
            expect($rootScope.articles[2].author).toEqual('');
        });
    });

    describe('\'#toTop()\' function', function() {
        it('should be defined', function() {
            //var func = $rootScope.toTop();

            /*console.log($rootScope.hideAll());
            expect(func).toBeDefined();*/
            
            /*scope.chooseSection = ('Show all sections...');
            $(window).scrollTop(600);
            console.log($(window).scrollTop());
            expect($(window).scrollTop()).toEqual(600);
            scope.toTop();
            expect($(window).scrollTop()).toEqual(0);*/
        });
    });

    describe('\'#hideAll()\' function', function() {
        it('should set \'currentSection\' and \'sectionsList\' fields of \'hide\' object to true', function() {
            $rootScope.hideAll();
            expect($rootScope.hide.currentSection).toBeTruthy();
            expect($rootScope.hide.sectionsList).toBeTruthy();
        });

        it('should remove \'logo_top\' class', function() {
            //$(".logo").addClass("logo_top");
            /*console.log($(".logo").hasClass("logo_top"));*/
            //expect($(".logo")).toHaveClass("logo_top");
        });
    });
});