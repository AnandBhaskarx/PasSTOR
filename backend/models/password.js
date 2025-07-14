const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String
});

module.exports = mongoose.model('Password', passwordSchema);
