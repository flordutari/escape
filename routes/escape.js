const express = require('express');
const router = express.Router();

const EscapeRoom = require('../models/EscapeRoom');

router.get('/list', async (req, res, next) => {
  try {
    const escapeRooms = await EscapeRoom.find();
    res.render('escape-rooms/list', { escapeRooms });
  } catch (error) {
    next(error);
  }
});

router.get('/list/:id', async (req, res, next) => {
  try {
    const escapeRooms = await EscapeRoom.find();
    res.render('escape-rooms/list', { escapeRooms });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
