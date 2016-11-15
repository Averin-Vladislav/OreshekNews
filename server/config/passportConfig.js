var LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
    User             = require('../models/userModel.js'),
    configAuth       = require('./authConfig');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local', new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) {
                throw err;
            }
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.local.password, function(err, isMatch){
                if(err) {
                    throw err;
                }
                if(isMatch) {
                    return done(null, user);
                } 
                else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

    passport.use('facebook', new FacebookStrategy({
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
            passReqToCallback : true
        },
        function(req, token, refreshToken, profile, done) {
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                        if (err) {
                            return done(err);
                        }

                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.facebook.token) {
                                user.facebook.token = token;
                                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                                user.facebook.email = profile.emails[0].value;

                                user.save(function(err) {
                                    if (err)
                                        throw err;
                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser            = new User();

                            newUser.facebook.id    = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = profile.emails[0].value;
                            newUser.avatarurl = "../resources/min/profile.png";

                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user            = req.user; // pull the user out of the session

                    user.facebook.id    = profile.id;
                    user.facebook.token = token;
                    user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = profile.emails[0].value;

                    user.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }));

    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,

        },
        function(token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));

    return passport;
};
