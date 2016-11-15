var express              = require('express'),  
    passport             = require('passport'),
    mongo                = require('mongodb'),
    mongoose             = require('mongoose'),
    bodyParser           = require('body-parser'),
    cookieParser         = require('cookie-parser'),
    session              = require('express-session'),
    morgan               = require('morgan'),
    cors                 = require('cors'),
    serverConfig         = require('./config/serverConfig.js'),
    dataBaseConfig       = require('./config/dataBaseConfig.js'),
    passportConfig       = require('./config/passportConfig.js'),
    authenticationRoutes = require('./routes/authenticationRoutes.js'),
    bookmarksRoutes      = require('./routes/bookmarksRoutes.js'),
    app;

app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
  //res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.path);

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'leprecon',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app = serverConfig(app);

app = authenticationRoutes(app);
app = bookmarksRoutes(app);

app.listen(app.get('port'), function() {
  console.log('Server started on port 3000. Press Ctrl-C to terminate...');
});