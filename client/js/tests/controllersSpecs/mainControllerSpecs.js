describe('MainController', function() {
    var scope, controller, location;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function($rootScope, $controller, $location) {
        scope = $rootScope;
        location = $location;

        controller = $controller('MainController', {
            $scope : scope
        });
    }));
    
    describe('#switching pages function', () => {
        it('should set url to \'/admin\'', function() {
            scope.switchPage('admin');
            expect(location.path()).toEqual('/admin');
        });

        it('should set url to \'/\'', function() {
            scope.switchPage('main');
            expect(location.path()).toEqual('/');
        });
    });
});

