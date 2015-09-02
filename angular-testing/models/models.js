/**
 * Created by shawnotomo on 8/28/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
	text: String,
	username: String,
	created_at: {type: Date, default: Date.now}
});

mongoose.model("User", userSchema);
mongoose.model("Post", postSchema);
