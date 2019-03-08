const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:id/create', (req, res, next) => {
  const { id } = req.params;
  res.render('events/create', { id });
});

module.exports = router;
