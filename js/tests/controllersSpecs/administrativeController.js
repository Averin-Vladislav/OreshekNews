describe('AdministrativeController', function() {
    var scope, controller;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope;

        controller = $controller('AdministrativeController', {
            $scope : scope
        });
    }));

    describe('#scope initialization', function() {
        it('should be defined', function() {
            expect(scope).toBeDefined();
        });
    });
});