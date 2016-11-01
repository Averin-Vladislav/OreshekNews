describe('selectForm directive', function() {
    var $compile, $rootScope, httpBackend;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../directives/selectForm/selectForm.html').respond(200, '');
    }));

    it('should compile <selectForm></selectForm> directive', function() {
        var  element = $compile('<select-form></select-form>')($rootScope);
        $rootScope.$digest();
        expect(element[0].outerHTML).toEqual('<select-form class="ng-scope"></select-form>');
    });
});