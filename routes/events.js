'use strict';
const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

const { requireUser } = require('../middlewares/index');

/* GET users listing. */

router.get('/list', requireUser, async (req, res, next) => {
  try {
    const event = await Event.find().populate('escapeRoom users creator');
    res.render('events/list', { event });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/create', requireUser, (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  res.render('events/create', { id, _id });
});

router.post('/list', requireUser, async (req, res, next) => {
  const { escapeRoom, showtime, date } = req.body;
  const event = {
    escapeRoom,
    date,
    showtime
  };
  try {
    event.creator = req.session.currentUser._id;
    event.players = [req.session.currentUser._id];
    await Event.create(event);
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('creator escapeRoom players');
    res.render('events/detail', { event });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  const event = await Event.findById(id).populate('creator escapeRoom players users');
  try {
    if (event.players.length < event.escapeRoom.capacity.maxPlayers) {
      await Event.findByIdAndUpdate(id, { $push: { 'players': { _id } } });
      res.redirect('/events/' + id);
    } else {
      res.redirect('/events/' + id);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
