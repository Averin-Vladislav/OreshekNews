describe('isIEService', function() {
    var isIEService;
    var checkBrowserVersion = function() {
        if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }

    beforeEach(module('oreshekNews'));
    beforeEach(inject(function(_isIEService_) {
        isIEService = _isIEService_;
    }));

    describe('#\'detect()\' function', function() {
        it('should aprove that current browser is IE', function() {
            expect(isIEService.detect('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)'))
                    .toBeTruthy();
        });
        it('should aprove that current browser is not IE', function() {
            expect(isIEService.detect('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'))
                    .toBeFalsy();
        });
        it('should check whether current browser is IE or not', function() {
            expect(checkBrowserVersion()).toEqual(isIEService.detect());
        });
    });
});