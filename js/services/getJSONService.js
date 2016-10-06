app.service('getJSONService', function() {
    return {
        getInfo : (pathToFile, callback) => {
                     $.getJSON(pathToFile, callback);
                }
    }
});