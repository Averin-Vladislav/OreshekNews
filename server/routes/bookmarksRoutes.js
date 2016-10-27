var User     = require('../models/userModel.js'),
    passport = require('passport');

var USERNAME = "";

module.exports = function(app) {
    app.post('/addToBookmarks', function(req, res) {
        var article = req.body.article.headline.main;
        console.log(article);
        req.user.bookmarks.push(article);
    });

    /*app.post('/login', passport.authenticate('local'), function(req, res) {
        console.log('authentication was complete successfuly');
        var avatarUrl = "";
        USERNAME = req.user.username;
        User.getUserByUsername(USERNAME, function(err, docs) {
            if(err) {
                throw err;
            }
            avatarUrl = docs.avatarurl;
            ID = docs._id;
            res.status(202);
            res.send({message: 'Authorized', avatarUrl: avatarUrl});
        })
    });

    app.get('/logout', function(req, res) {
        console.log('user was loged out');
        req.logout();
        res.status(200);
        res.send('Loged out');
    }); */

    return app;
};