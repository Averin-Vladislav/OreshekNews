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
            var isSame = false;
            for(var i = 0; i < user.bookmarks.length; i++) {
                if(user.bookmarks[i].title === temp.title) {
                    isSame = true;
                    res.status(203);
                    res.send("Data is already exists");
                    return;
                }
            }

            if(isSame === false) {
                user.bookmarks.push(temp);
                user.save(function() {
                });   
                res.status(201);
                res.send("Data was added successfully");
            }
        });
    });

    app.post('/deleteFromBookmarks', function(req, res) {
        var username = req.body.article.username;
        var newsTitle = req.body.article.title;
        User.deleteAccordingCriteria(username, { $pull: { 'bookmarks': { 'title': newsTitle } } }, function(response) {
            res.send(response);
        });
    });

    app.post('/checkIfExists', function(req, res) {
        var username = req.body.article.username;
        var title = req.body.article.title;

        User.getUserByUsername(username, function(err, user) {
            if(err) {
                throw err;
            }
            var isExists = false;
            for(var i = 0; i < user.bookmarks.length; i++) {
                if(user.bookmarks[i].title === title) {
                    isExists = true;
                    res.status(200);
                    res.send("Data is already exists");
                    return;
                }
            }

            if(isExists === false) {
                res.status(200);
                res.send("Data is not exists");
            }
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