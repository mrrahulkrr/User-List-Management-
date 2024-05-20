const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  customProperties: { type: Map, of: String },
  unsubscribed: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
