var User     = require('../models/userModel.js');

module.exports = function(app) {
    app.post('/addToBookmarks', function(req, res) {
        var username = req.body.article.username;
        var temp = {
            web_url: req.body.article.web_url,
            gallery: req.body.article.gallery,
            date: req.body.article.date,
            author: req.body.article.author,
            title: req.body.article.title,
            lead_paragraph: req.body.article.lead_paragraph
        }
        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }
            user.bookmarks.push(temp);
            user.save(function() {
            }); 
        });
    });

    app.get('/getBookmarks/:username', function(req, res) {
        username = req.params.username;
        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }
            res.status(202);
            res.send({message: 'Get data success', bookmarks: user.bookmarks});
        });
    });

    return app;
};