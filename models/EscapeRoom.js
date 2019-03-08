const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const escapeRoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dificulty: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 60
  },
  capacity: {
    maxPlayers: {
      type: Number,
      default: 6
    },
    minPlayers: {
      type: Number,
      default: 3
    }
  },
  direction: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      default: 'point'
    },
    coordinates: [Number]
  },
  schedule: {
    days: {
      type: String,
      required: true
    },
    showtime: {
      type: Array,
      required: true
    }
  },
  icon: {
    type: String,
    default: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1551997800/projectImages/logo_default.png',
    required: true
  },
  image: {
    type: String,
    default: 'https://res.cloudinary.com/drkujr1xv/image/upload/v1551997800/projectImages/HourEscape-Banner-V1-0-e1504861040897.jpg',
    required: true
  }

});

const EscapeRoom = mongoose.model('EscapeRoom', escapeRoomSchema);

module.exports = EscapeRoom;
