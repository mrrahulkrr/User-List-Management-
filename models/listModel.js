const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  customProperties: [
    {
      title: { type: String, required: true },
      fallback: { type: String, required: true },
    }
  ],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const List = mongoose.model('List', listSchema);

module.exports = List;
