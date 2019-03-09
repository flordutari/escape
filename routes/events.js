'use strict';
const express = require('express');
const router = express.Router();

const Event = require('../models/Event');

/* GET users listing. */

router.get('/list', async (req, res, next) => {
  try {
    const event = await Event.find();
    res.render('events/list', { event });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/create', (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  res.render('events/create', { id, _id });
});

router.post('/list', async (req, res, next) => {
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
    console.log(event.players);
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('creator escapeRoom players');
    console.log(event.date);
    res.render('events/detail', { event });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const event = await Event.findByIdAndUpdate(id);
    console.log(event.date);
    res.render('events/detail', { event });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
