describe('sectionList directive', function() {
    var $compile, $rootScope, httpBackend;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../directives/sectionList/sectionList.html').respond(200, '');
    }));

    it('should compile <section-list></section-list> directive', function() {
        var  element = $compile('<section-list></section-list>')($rootScope);
        $rootScope.$digest();
        expect(element[0].outerHTML).toEqual('<section-list class="ng-scope"></section-list>');
    });
});