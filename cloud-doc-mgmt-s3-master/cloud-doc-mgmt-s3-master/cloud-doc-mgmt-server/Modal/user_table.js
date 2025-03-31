const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  documentType: {
    type: String,
    required: true,
  },
  documentName: {
    type: String,
    required: true,
  },
  documentLink: {
    type: String,
    required: true,
  },
  documentDescription: {
    type: String,
    required: false,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});
const UserSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  documents: [DocumentSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
