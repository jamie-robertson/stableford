var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new Schema ({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  passwordHash: String,
  passwordSalt: String,
  handicap: { type: Number, min: 1, max: 3}
});

module.exports = mongoose.model('User', userSchema);