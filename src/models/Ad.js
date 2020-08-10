const { Schema, model } = require('mongoose');

const adSchema = new Schema({
  name: String,
  company: String,
  description: String,
  category: String,
  link: String,
  keywords: String,
  userid: String,
  lasttimestamp: String
}, {
  collection: 'ads'
});

adSchema.index({ name: 'text', 'company': 'text', 'description': 'text', 'category': 'text', 'keywords': 'text' });

module.exports = model('Ad', adSchema);