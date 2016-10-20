var express              = require('express'),
    cookieParser         = require('cookie-parser'),   
    exphbs               = require('express-handlebars'),
    passport             = require('passport'),
    mongo                = require('mongodb'),
    mongoose             = require('mongoose'),
    bodyParser           = require('body-parser'),
    serverConfig         = require('./config/serverConfig.js'),
    dataBaseConfig       = require('./config/dataBaseConfig.js'),
    passportConfig       = require('./config/passportConfig.js'),
    authenticationRoutes = require('./routes/authenticationRoutes.js'),
    app;

app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.path);

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app = serverConfig(app);

app = authenticationRoutes(app);

app.listen(app.get('port'), function() {
  console.log('Express started on port 3000. Press Ctrl-C to terminate');
});

/*
// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
*/