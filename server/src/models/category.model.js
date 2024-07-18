// IMPORT MONGOOSE
const mongoose = require('mongoose');

// DEFINE DOCUMENT SCHEMA
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
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
CategorySchema.set('toJSON', { virtuals: true });

// CREATE MODEL TO INTERACT WITH "settings" COLLECTION IN DATABASE
module.exports = mongoose.model('Category', CategorySchema);
