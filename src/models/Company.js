const { Schema, model } = require('mongoose');

const companySchema = new Schema({
  name: String,
  identification: String,
  description: String,
  phone: String,
  link: String,
  keywords: String,
  userid: String,
  lasttimestamp: String
}, {
  collection: 'companies'
});

companySchema.index({ 'name': 'text', 'identification': 'text', 'description': 'text', 'phone': 'text', 'link': 'text', 'keywords': 'text' });

module.exports = model('Company', companySchema);