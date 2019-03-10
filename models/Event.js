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
    type: Date,
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
    }],
    limit: 2,
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  }
});

function arrayLimit (players) {
  return players.length <= 3;
}

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
