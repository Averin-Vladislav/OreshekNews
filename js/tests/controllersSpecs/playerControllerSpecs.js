describe('PlayerController', function() {
    var $rootScope, $controller;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;

        $controller = _$controller_('PlayerController', {
            $scope : $rootScope
        });
    }));

    describe('#scope initialization', function() {
        it('should be defined', function() {
            expect($rootScope).toBeDefined();
        });
    });

    describe('#backround video mode switching', function() {
        it('should set player mode on if browser in not IE', function() {
            $rootScope.setPlayer('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36');
            //pending implementation
        });
        it('should set player mode of if browser in IE', function() {
            $rootScope.setPlayer('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586)');
            //pending implementation
        });
    });
});