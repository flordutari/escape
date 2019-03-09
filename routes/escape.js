'use strict';
const express = require('express');
const router = express.Router();

const EscapeRoom = require('../models/EscapeRoom');
const { requireUser } = require('../middlewares/index');

router.get('/list', requireUser, async (req, res, next) => {
  try {
    const escapeRoom = await EscapeRoom.find();
    res.render('escape-rooms/list', { escapeRoom });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  // const {_id} = req.session.currentuser;
  try {
    const escapeRoom = await EscapeRoom.findById(id);
    res.render('escape-rooms/detail', { escapeRoom });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
