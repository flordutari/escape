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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  // const {_id} = req.session.currentuser;
  try {
    const escapeRooms = await EscapeRoom.findById(id);
    res.render('escape-rooms/detail', { escapeRooms });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
