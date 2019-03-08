const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/create', (req, res, next) => {
  res.render('events/create');
});

module.exports = router;
