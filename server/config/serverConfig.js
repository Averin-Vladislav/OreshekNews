var expressValidator = require('express-validator'),
    passport         = require('passport');

module.exports = function(app) {
    app.set('port', process.env.PORT || 3000);

    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.'),
                root    = namespace.shift(),
                formParam = root;

            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param : formParam,
                msg   : msg,
                value : value
            };
        }
    }));

    return app;
};