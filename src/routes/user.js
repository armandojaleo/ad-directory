const userRoutes = require('express').Router();
const User = require('../models/User');
const verifyToken = require('./verifyToken');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

userRoutes.route('/me').get(verifyToken, async (req, res, next) => {
  if (req.userid) {
    const user = await User.findById(req.userid, { password: 0 });
    if (!user) {
      return res.status(404).send("No user found.");
    }
    res.status(200).json(user);
  } else {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }
});

userRoutes.route('/signup').post(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password
    });
    user.password = await user.encryptPassword(password);
    await user.save();
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 60 * 30
    });
    res.json({ auth: true, token });
  } catch (e) {
    console.log(e)
    res.status(500).send('There was a problem registering your user');
  }
});

userRoutes.route('/signin').post(async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.status(404).send("The username doesn't exists")
  }
  const validPassword = await user.comparePassword(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 30
  });
  res.status(200).json({ auth: true, token });
});

userRoutes.route('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

userRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    res.json(user);
  });
});

userRoutes.route('/update').post(verifyToken, async (req, res, next) => {
  if (req.userid) {
    await User.findById(req.userid, async (err, user) => {
      if (!user)
        return next(new Error('Could not load Document'));
      else {
        const { password1, password2 } = req.body;
        if (password1 === password2) {
          user.password = await user.encryptPassword(password1)
          await user.save().then(user => {
            const token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 60 * 30
            });
            res.json({ auth: true, token, user });
          }).catch(err => {
            res.status(400).send("Unable to update the database");
          });
        } else {
          res.status(400).send("Error password");
        }
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }
});

userRoutes.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = userRoutes;