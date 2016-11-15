var mongoose = require('mongoose'),
	bcrypt   = require('bcryptjs');

var UserSchema = mongoose.Schema({
	local: {
		username: {
			type: String,
			index: true
		},
		password: {
			type: String
		},
		email: {
			type: String
		},
		name: {
			type: String
		}
	},
	avatarurl: {
		type: String
	},
	bookmarks: [{
		web_url: String,
		gallery: String,
		date: String,
		author: String,
		title: String,
		lead_paragraph: String
	}],
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	},
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.local.password, salt, function(err, hash) {
	        newUser.local.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {'local.username': username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById('local.id', callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.updateInfo = function(id, propertyName, propertyValue, callback) {
	User.update({_id: id}, {
	    propertyName: propertyValue
	}, callback);
}

module.exports.deleteAccordingCriteria = function(username, criteria, callback) {
	var query = {'local.username': username};
	User.update(query, criteria, false, callback);
}

