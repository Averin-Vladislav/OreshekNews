var express           = require('express'),
    path              = require('path'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    expressHandlebars = require('express-handlebars'),
    expressValidator  = require('express-validator'),
    flash             = require('connect-flash'),
    expressSession    = require('express-session'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local').Strategy,
    mongo             = requier('mongodb'),          
    mongoose          = require('mongoose');
    mongoose.connect('mongodb://localhost/loginapp');
var db = mongoode.connection;

var routes = require('/routes/index'),
    users  = require('/users/users');

var app = express();

app.set('views', )
