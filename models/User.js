'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: '../images/default.png'
  },
  description: {
    type: String,
    default: 'I will survive'
  },
  myEvents: [{
    type: ObjectId,
    ref: 'Event'
  }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
