app.service('getJSONService', function() {
    let getJSONService = {};

    getJSONService.getInfo = (pathToFile, callback) => {
        $.getJSON(pathToFile, callback);
    }

    return getJSONService;
});