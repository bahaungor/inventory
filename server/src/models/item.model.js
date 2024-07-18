// IMPORT MONGOOSE
const mongoose = require('mongoose');

// DEFINE DOCUMENT SCHEMA
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  imageURL: { type: String, required: true },
  createdBy: { type: String, default: 'User' },

  // Additional fields for tracing and context
  createdAt: { type: Date, default: Date.now },
  createdByIP: { type: String },
  createdByUserAgent: { type: String },
  referer: { type: String },
  metadata: {
    browser: { type: String },
    platform: { type: String },
    device: { type: String },
  },
});

// ACCESS VIRTUALS FROM REACT APP
ItemSchema.set('toJSON', { virtuals: true });

// CREATE MODEL TO INTERACT WITH "settings" COLLECTION IN DATABASE
module.exports = mongoose.model('Item', ItemSchema);
