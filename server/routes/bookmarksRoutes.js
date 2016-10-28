var User     = require('../models/userModel.js');

module.exports = function(app) {
    app.post('/addToBookmarks', function(req, res) {
        console.dir(req);
        var username = req.user.username;
        User.getUserByUsername(username, function(err,user) {
            if(err) {
                throw err;
            }
            user.bookmarks.push(req.body.article); 
        });
    });

    return app;
};