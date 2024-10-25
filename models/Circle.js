const mongoose = require('mongoose');

const circleSchema = new mongoose.Schema({
  name: String,
  school: String,
  grade: String,
  section: String,
  society: String,
  members:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent'
  }]
});

module.exports = mongoose.model('Circle', circleSchema);
