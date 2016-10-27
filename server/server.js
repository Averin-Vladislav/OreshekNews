var express              = require('express'),  
    passport             = require('passport'),
    mongo                = require('mongodb'),
    mongoose             = require('mongoose'),
    bodyParser           = require('body-parser'),
    serverConfig         = require('./config/serverConfig.js'),
    dataBaseConfig       = require('./config/dataBaseConfig.js'),
    passportConfig       = require('./config/passportConfig.js'),
    authenticationRoutes = require('./routes/authenticationRoutes.js'),
    bookmarksRoutes      = require('./routes/bookmarksRoutes.js'),
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
app = bookmarksRoutes(app);

app.listen(app.get('port'), function() {
  console.log('Server started on port 3000. Press Ctrl-C to terminate...');
});