const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parent' },
  circle: { type: mongoose.Schema.Types.ObjectId, ref: 'Circle' },
  isReply: { type: Boolean, default: false },
  parentPost: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null },
  votes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postSchema);
