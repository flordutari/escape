'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
  escapeRoom: {
    type: ObjectId,
    ref: 'EscapeRoom'
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
  date: {
    type: String,
    required: true
  },
  showtime: {
    type: String,
    enum: ['17:00', '18:30', '20:00', '21:30', '23:00'],
    required: true
  },
  players: {
    type: [{
      type: ObjectId,
      ref: 'User'
    }]
  },
  comments: [{
    type: String,
    ref: 'User'
  }]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
