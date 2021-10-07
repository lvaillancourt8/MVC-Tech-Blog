const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../../models');

// CREATE new user
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);


    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      req.session.username = userData.username;
    });
    // res.json(newUser) 
    res.render('dashboard', req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    )
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Password Error! Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      req.session.username = userData.username;
      console.log(req.session);
    });

    // if they do match, return success message
    console.log(userData);
    res.render('dashboard', req.session);
    // res.status(200).json({ userData, message: 'You are now logged in!' });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;