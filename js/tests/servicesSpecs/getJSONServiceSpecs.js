describe('getJSONService', function() {
    var getJSONService;
    var httpBackend;
    var path = '../../resources/data/sections.json';
    var data;
    var $rootScope;

    beforeEach(module('oreshekNews'));

    beforeEach(inject(function(_$rootScope_, _getJSONService_, $httpBackend) {
        $rootScope = _$rootScope_;
        getJSONService = _getJSONService_;
        httpBackend = $httpBackend;
        httpBackend.whenGET('../../resources/data/sections.json').respond(200, '');
    }));

    describe('#\'getInfo()\' function', function() {
        it('should return all data sections', function() {
            getJSONService.getInfo(path, function(info) {
                //$rootScope.data = info.sections;
                console.log(1);
            });

            //console.log($rootScope.data);
        });
    });
})