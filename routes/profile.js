'use strict';
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User');

const { requireUser } = require('../middlewares/index');

module.exports = router;

router.get('/:id', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    res.render('profile/profile', { _id, user });
  } catch (error) {
    next(error);
  }
});
