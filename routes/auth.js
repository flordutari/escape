'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');
const { requireAnon, requireUser, requireFields } = require('../middlewares/auth');

const saltRounds = 10;

/* GET home page. */
router.get('/signup', requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  };
  res.render('auth/signup', data);
});

router.post('/signup', requireAnon, requireFields, async (req, res, next) => {
  const { username, password } = req.body;
  // comprobar que el usuario no existe en la base de datos
  try {
    const result = await User.findOne({ username });
    if (result) {
      req.flash('validation', 'This username is taken');
      res.redirect('/auth/signup');
      return;
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear el usuario
    const newUser = {
      username,
      password: hashedPassword
    };
    const createdUser = await User.create(newUser);
    // guardamos el usuario en la session
    req.session.currentUser = createdUser;
    // Redirigimos para la Homepage
    res.redirect('../events/list');
  } catch (error) {
    next(error);
  }
});

router.get('/login', requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('validation')
  };
  res.render('auth/login', data);
});

router.post('/login', requireAnon, requireFields, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Comprobar que el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('validation', 'Username or password incorrect');
      res.redirect('/auth/login');
      return;
    }
    // Comparar contrasena
    if (bcrypt.compareSync(password, user.password)) {
      //  lo siguiente es para guardar la session (mediante el cookie)
      req.session.currentUser = user;
      res.redirect('../events/list');
    } else {
      req.flash('validation', 'Username or password incorrect');
      res.redirect('/auth/login');
    }
    // Redirigimos para la Homepage
    res.redirect('../events/list');
  } catch (error) {
    next(error);
  }
});

router.post('/logout', requireUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
