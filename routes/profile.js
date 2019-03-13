'use strict';
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/User');

const { requireUser } = require('../middlewares/index');

const parser = require('../helpers/file-upload');

module.exports = router;

router.get('/edit', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const data = {
    messages: req.flash('check-edit')
  };
  try {
    const user = await User.findById(_id);
    res.render('profile/edit', { user, data });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireUser, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(_id);
    res.render('profile/profile', { user });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireUser, async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.session.currentUser;
  try {
    const user = await User.findById(id).populate({
      path: 'myEvents',
      populate: {
        path: 'escapeRoom',
        model: 'EscapeRoom' }
    });

    let isOwnProfile = false;
    if (user._id.equals(_id)) {
      isOwnProfile = true;
    }
    res.render('profile/profile', { user, isOwnProfile });
  } catch (error) {
    next(error);
  }
});

router.post('/edit', requireUser, parser.single('image'), async (req, res, next) => {
  const { username, description } = req.body;
  const { _id } = req.session.currentUser;
  const user = {
    username,
    description
  };
  if (req.file) {
    user.imageUrl = req.file.url;
  }
  try {
    if (!username || !description) {
      req.flash('check-edit', 'you need a Name and a Descritpopn');
      res.redirect('/profile/edit');
      return;
    }
    console.log(user.username, user.description);
    const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true });
    req.session.currentUser = updatedUser;
    res.redirect('/profile/' + _id);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
