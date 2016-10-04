describe('OreshekNewsController', () => {
    var scope, httpBackend, timeout, location, controller;

    var checkBrowserVersion = function() {
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    var isIE = checkBrowserVersion();

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function($rootScope, $httpBackend, $timeout, $location, $controller) {
        scope = $rootScope;
        httpBackend = $httpBackend;
        timeout = $timeout;
        location = $location;

        controller = $controller('OreshekNewsController', {
            $scope : scope
        });
    }));

    describe('#variables initialization', function() {
        it('should initialize \'currentSection\' and \'sectionsList\' fields of \'hide\' object', function() {
            expect(scope.hide.currentSection).toBeTruthy();
            expect(scope.hide.sectionsList).toBeTruthy();
        });

        it('should initialize \'currentSection\' and \'sectionsList\' fields of \'hide\' object', function() {
            expect(scope.hide.currentSection).toBeTruthy();
            expect(scope.hide.sectionsList).toBeTruthy();

            if(isIE) {
                expect(scope.hide.spinnerGIF).toBeFalsy();
                expect(scope.hide.spinnerCSS).toBeTruthy();
            }
            else {
                expect(scope.hide.spinnerGIF).toBeTruthy();
                expect(scope.hide.spinnerCSS).toBeFalsy();
            }
        });
    });

    describe('#\'isIE()\' function', function() {
        it('should aprove that current browser is IE', function() {
            expect(scope.isIE('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)'))
                   .toBeTruthy();
        });
        it('should aprove that current browser is not IE', function() {
            expect(scope.isIE('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'))
                   .toBeFalsy();
        });
        it('should check whether current browser is IE or not', function() {
            if(isIE) {
                expect(scope.isIE()).toBeTruthy();
            }
            else {
                expect(scope.isIE()).toBeFalsy();
            }
        });
    });

    describe('#\'hideSpinner()\' function', function() {
        it('should hide spinner if browser is IE', function() {
            scope.hideSpinner(true, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)');
            expect(scope.hide.spinnerGIF).toBeTruthy();
        });
        it('should hide spinner if browser is not IE', function() {
            scope.hideSpinner(true, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36');           
            expect(scope.hide.spinnerCSS).toBeTruthy();
        });
    });

    describe('#page onloading spinner hiding', function() {
        it('should hide spinner after 5 seconds after page has been loaded', function() {
            if(isIE) {
                expect(scope.hide.spinnerGIF).toBeFalsy();
            }
            else {
                expect(scope.hide.spinnerCSS).toBeFalsy();
            }

            scope.waitPageLoading();
            timeout.flush(5001);

            if(isIE) {
                expect(scope.hide.spinnerGIF).toBeTruthy();
            }
            else {
                expect(scope.hide.spinnerCSS).toBeTruthy();
            }
        });
    });

    /*describe('\'#toTop()\' function', function() {
        it('should set viewport position to 0', function() {
            scope.chooseSection = ('Show all sections...');
            $(window).scrollTop(600);
            console.log($(window).scrollTop());
            expect($(window).scrollTop()).toEqual(600);
            scope.toTop();
            expect($(window).scrollTop()).toEqual(0);
        });
    });*/

    describe('\'#hideAll()\' function', function() {
        it('should set \'currentSection\' and \'sectionsList\' fields of \'hide\' object to true', function() {
            scope.hideAll();
            expect(scope.hide.currentSection).toBeTruthy();
            expect(scope.hide.sectionsList).toBeTruthy();
        });

        it('should remove \'logo_top\' class', function() {
            //$(".logo").addClass("logo_top");
            /*console.log($(".logo").hasClass("logo_top"));*/
            //expect($(".logo")).toHaveClass("logo_top");
        });
    });
});