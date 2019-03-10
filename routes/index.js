'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('../auth/login');
  } else {
    res.redirect('../events/list');
  }
});

module.exports = router;
