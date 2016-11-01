describe('AdministrativeController', function() {
    var $rootScope, $controller;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$rootScope_, _$controller_) {
        $rootScope = _$rootScope_;

        $controller = _$controller_('AdministrativeController', {
            $scope : $rootScope
        });
    }));

    describe('#scope initialization', function() {
        it('should be defined', function() {
            expect($rootScope).toBeDefined();
        });
    });
});