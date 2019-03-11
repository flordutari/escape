'use strict';
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User');

const { requireUser } = require('../middlewares/index');

const parser = require('../helpers/file-upload');

module.exports = router;

router.get('/', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    res.render('profile/profile', { _id, user });
  } catch (error) {
    next(error);
  }
});

router.get('/edit', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    res.render('profile/edit', { _id, user });
  } catch (error) {
    next(error);
  }
});

router.post('/edit', requireUser, parser.single('image'), async (req, res, next) => {
  const { username, description, imageUrl } = req.body;
  const { _id } = req.session.currentUser;
  const user = {
    username,
    description,
    imageUrl: req.file.url
  };
  console.log(imageUrl);
  try {
    await User.findByIdAndUpdate(_id, user);
    console.log({ _id }, user);
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
