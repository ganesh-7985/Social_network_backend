const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  school: String,
  grade: String,
  section: String,
  society: String,
  circles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Circle' }],
});

module.exports = mongoose.model('Parent', parentSchema);
