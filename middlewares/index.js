'use strict';

module.exports = {

  requireUser (req, res, next) {
    if (!req.session.currentUser) {
      res.redirect('../auth/login');
      return;
    }
    next();
  },

  requireFields (req, res, next) {
    const { inputDate, showtime } = req.body;
    if (!inputDate || !showtime) {
      req.flash('check', 'Showtime or date missing');
      res.redirect(`/events${req.path}`);
      return;
    }
    next();
  }
};
