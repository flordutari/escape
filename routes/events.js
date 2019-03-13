'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
const Event = require('../models/Event');
const User = require('../models/User');

const { requireUser, requireFields } = require('../middlewares/index');

/* GET users listing. */

router.get('/list', requireUser, async (req, res, next) => {
  try {
    const events = await Event.find().populate('escapeRoom users creator');
    const eventsWithAvailability = events.filter((event) => {
      return event.players.length < event.escapeRoom.capacity.maxPlayers;
    });
    res.render('events/list', { events: eventsWithAvailability });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/create', requireUser, (req, res, next) => {
  const dato = {
    messages: req.flash('check')
  };
  const { id } = req.params;
  const { _id } = req.session.currentUser;

  res.render('events/create', { id, _id, dato });
});

router.post('/:id/create', requireFields, requireUser, async (req, res, next) => {
  const { escapeRoom, showtime, inputDate } = req.body;
  const date = moment(new Date(`${inputDate}`)).format('ll');
  const event = {
    escapeRoom,
    date,
    showtime
  };
  try {
    event.creator = req.session.currentUser._id;
    event.players = [req.session.currentUser._id];
    const a = await Event.create(event);
    await Event.findById(a._id);
    await User.findByIdAndUpdate(a.creator, { $push: { 'myEvents': a._id } });
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const event = await Event.findById(id).populate('creator escapeRoom players');
    const rest = event.escapeRoom.capacity.maxPlayers - event.players.length;
    let isOwnProfile = false;
    if (event.creator._id.equals(_id)) {
      isOwnProfile = true;
    }
    res.render('events/detail', { event, rest, isOwnProfile });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  const event = await Event.findById(eventId).populate('creator escapeRoom players users');
  let notAlreadyIn = true;
  console.log(event.players.id);
  event.players.filter((user) => {
    if (user._id === userId) {
      console.log(user._id);
      notAlreadyIn = false;
    }
  });
  try {
    if (event.players.length < event.escapeRoom.capacity.maxPlayers && notAlreadyIn) {
      await Event.findByIdAndUpdate(eventId, { $push: { 'players': userId } });
      await User.findByIdAndUpdate(userId, { $push: { 'myEvents': eventId } });
    }
    res.redirect('/events/' + eventId);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/unjoin', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  try {
    const userID = mongoose.mongo.ObjectID(userId);
    await Event.findByIdAndUpdate(eventId, { $pull: { 'players': userID } });
    await User.findByIdAndUpdate(userId, { $pull: { 'myEvents': eventId } });
    res.redirect('/events/' + eventId);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
