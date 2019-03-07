const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

const saltRounds = 10;

/* GET home page. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res, next) => {
  // // if ( req.session.currentUser){  // esto podemos quitarlo por el middleware
  // //   res.redirect('/');
  // //   return;
  // // }
  // // Extraer body
  const { username, password } = req.body;
  // // Comprobar que username y password existen
  // // if (!password || !username) {     ////tenemos ya el requirefields
  // //   res.redirect('/auth/signup');
  // //   return;
  // // }
  // // Comprobar que el usuario no existe en la base de datos

  try {
  //   const result = await User.findOne({ username });
  //   if (result) {
  //     req.flash('validation', 'This username is taken'); // aqui metemos el flash
  //     res.redirect('/auth/signup');
  //     return;
  //   }
    // Encryptar password----vamos al cheetsheet /m2/express-apps/bcrypt.js
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear el usuario
    const newUser = {
      username,
      password: hashedPassword
    };
     User.create(newUser);
    // guardamos el usuario en la session
    // req.session.currentUser = createdUser;
    // Redirigimos para la Homepage
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
