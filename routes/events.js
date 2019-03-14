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
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  try {
    const event = await Event.findById(eventId).populate({
      path: 'comments.creator escapeRoom players creator',
      populate: {
        path: 'user',
        model: 'User' }
    });
    const rest = event.escapeRoom.capacity.maxPlayers - event.players.length - 1;
    let isOwnProfile = false;
    if (event.creator._id.equals(userId)) {
      isOwnProfile = true;
    };

    let isOwnComment = false;
    event.comments.map((a) => {
      if (a.creator._id.equals(userId)) {
        isOwnComment = true;
      }
    });
    console.log(isOwnComment);

    let isAlreadyIn = false;
    event.players.map((a) => {
      if (a._id.equals(userId)) {
        isAlreadyIn = true;
      }
    });

    res.render('events/detail', { event, rest, isOwnProfile, isAlreadyIn, eventId, isOwnComment });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  const event = await Event.findById(eventId).populate('players escapeRoom');
  let notAlreadyIn = true;
  event.players.map((a) => {
    if (a._id.equals(userId)) {
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

router.post('/:id/comment', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  const { comment } = req.body;
  const userId = req.session.currentUser._id;
  const userID = mongoose.mongo.ObjectID(userId);
  try {
    await Event.findByIdAndUpdate(eventId, { $push: { 'comments': { 'comment': comment, 'creator': userID } } });
    res.redirect('/events/' + eventId);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete-comment', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  const { commentId } = req.body;
  const commentID = mongoose.mongo.ObjectID(commentId);
  try {
    await Event.findByIdAndUpdate(eventId, { $pull: { 'comments': { _id: commentID } } });
    res.redirect('/events/' + eventId);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', requireUser, async (req, res, next) => {
  const eventId = req.params.id;
  try {
    await Event.findByIdAndDelete(eventId);
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
