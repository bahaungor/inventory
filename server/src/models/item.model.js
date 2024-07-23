// IMPORT MONGOOSE
const mongoose = require('mongoose');

// DEFINE DOCUMENT SCHEMA
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: {
    URL: { type: String, required: true },
    cloudinaryID: { type: String, required: true },
  },
  createdBy: { type: String, default: 'User' },
  createdAt: { type: Date, default: Date.now },
  createdByIP: { type: String },
  createdLang: { type: String },
  createdRef: { type: String },
});

// ACCESS VIRTUALS FROM REACT APP
ItemSchema.set('toJSON', { virtuals: true });

// CREATE MODEL TO INTERACT WITH "settings" COLLECTION IN DATABASE
module.exports = mongoose.model('Item', ItemSchema);
