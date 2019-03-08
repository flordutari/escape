const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const eventSchema = new Schema({
  escapeRoom: {
    type: ObjectId,
    ref: 'Escape room',
    required: true
  },
  creator: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  players: {
    type: Array:
      type: ObjectId
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
