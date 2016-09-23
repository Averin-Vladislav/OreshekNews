app.service('getJSONService', function() {
    let getJSONService = {};

    getJSONService.getInfo = (path, callback) => {
        $.getJSON(path, callback);
    }

    return getJSONService;
});