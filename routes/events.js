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
  res.render('events/create', { id });
});

router.post('/list', async (req, res, next) => {
  const { showtime, date } = req.body;
  const event = {
    date,
    showtime
  };
  try {
    await Event.create(event);
    res.redirect('/events/list');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
