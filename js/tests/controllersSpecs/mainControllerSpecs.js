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

    describe('#variables initialization', function() {
        it('should initialize \'nextPage\' and \'currentPage\' variables', function() {
            expect(scope.nextPage).toEqual('Admin page');
            expect(scope.currentPage).toEqual('Main page');
        });
    });
    
    describe('#switching pages function', () => {
        it('should switch \'currentPage\' to \'Admin page\'', function() {
            scope.switchPage('Main page');
            expect(scope.currentPage).toEqual('Admin page');
            expect(scope.nextPage).toEqual('back to Main page');
        });

        it('should switch \'currentPage\' to \'Main page\'', function() {
            scope.switchPage('Admin page');
            expect(scope.currentPage).toEqual('Main page');
            expect(scope.nextPage).toEqual('Admin page');
        });

        it('should set url to \'/admin\'', function() {
            scope.switchPage('Main page');
            expect(location.path()).toEqual('/admin');
        });

        it('should set url to \'/\'', function() {
            scope.switchPage('Admin page');
            expect(location.path()).toEqual('/');
        });
    });
});

