const express = require('express');
const router = express.Router();

const EscapeRoom = require('../models/EscapeRoom');
const User = require('../models/User');
const Event = require('../models/Event');

/* GET users listing. */
router.get('/:id/create', (req, res, next) => {
  const { id } = req.params;
  res.render('events/create', { id });
});

// router.get('/:id', async (req, res, next) => {
//   const { id } = req.params;
//   // const {_id} = req.session.currentuser;
//   try {
//     const escapeRoom = await EscapeRoom.findById(id);
//     res.render('escape-rooms/detail', { escapeRoom });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
