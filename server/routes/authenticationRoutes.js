var User     = require('../models/userModel.js'),
    passport = require('passport');

var USERNAME = "";
var ID;

module.exports = function(app) {
    app.post('/register', function(req, res) {
        var name      = req.body.name;
        var email     = req.body.email;
        var username  = req.body.username;
        var password  = req.body.password;
        var password2 = req.body.password2;

        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Emial is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if(errors) {
            res.status(401);
            res.send('Unregistered');
        } 
        else {
            var newUser = new User({
                name: name,
                email: email, 
                username: username,
                password: password,
                avatarurl: "../resources/min/profile.png"
            });
            User.createUser(newUser, function(err, user) {
                if(err) {
                    throw err;
                }
            });
            res.status(201);
            res.send('Registered');
        }
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
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
    }); 

    app.post('/uploadAvatar', function(req, res) {
        console.log(ID);
        User.update({_id: ID}, {
            avatarurl: req.body.avatarUrl
        }, function(err, docs) {
            if(err) {
                throw err;
            }
        });
        res.status(200);
        res.send('Avatar was uploaded');
    }); 

    return app;
};