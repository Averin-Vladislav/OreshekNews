describe('player directive', function() {
    var $compile, $rootScope, httpBackend;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../directives/player/player.html').respond(200, '');
    }));

    it('should compile <player></player> directive', function() {
        var  element = $compile('<player></player>')($rootScope);
        $rootScope.$digest();
        expect(element[0].outerHTML).toEqual('<player class="ng-scope"></player>');
    });
});