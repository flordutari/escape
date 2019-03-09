'use strict';

module.exports = {

  requireUser (req, res, next) {
    if (!req.session.currentUser) {
      res.redirect('../auth/login');
      return;
    }
    next();
  }

};
