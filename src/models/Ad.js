const { Schema, model } = require('mongoose');

const adSchema = new Schema({
  name: String,
  company: String,
  description: String,
  category: String,
  userid: String,
  lasttimestamp: String
}, {
  collection: 'ads'
});

module.exports = model('Ad', adSchema);