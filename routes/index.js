const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

// router.get('/escape/list', (req, res, next) => {
//   res.render('escape-rooms/list');
// });

module.exports = router;
