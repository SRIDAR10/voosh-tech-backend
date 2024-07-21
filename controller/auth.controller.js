const httpStatus = require('http-status');
const logger = require('../middlewares/logger');
const catchAsync = require('../middlewares/catchAsync');
const {UserService} = require('../services');
const passport = require('passport');
const UserModel = require('../db/models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
};


const signup = async (req, res) => {
  const { email, password, firstName, lastName, sso } = req.body;
  try {
    const userExists = await UserModel.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await UserModel.create({ email, password, firstName, lastName, sso });
    req.login(user, { session: false }, err => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after signup' });
      }
      const token = generateToken(user);
      res.status(201).json({ message: 'User created and logged in', user, token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ where: { email, sso: false } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Failed to log in', error: err.message });
  }
};

const googleSignup = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleSignupCallback = (req, res) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    console.log(err);
    if (err) {
      return res.status(500).json({ message: 'Error authenticating with Google' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Google authentication failed' });
    }

    try {
      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000
      });
      res.cookie('user', user, {
        httpOnly: true,
        secure: false, 
        maxAge: 3600000
      });
      res.redirect(process.env.CORS_URL);
    } catch (err) {
      console.error('Error generating token:', err);
      res.status(500).json({ message: 'Failed to generate JWT token' });
    }
  })(req, res);
};

const logout = (req, res, next) => {
  try{
    req.logout(err => {
      if (err) {
        logger.error(err);
        return next(err);
      }
    });
  } catch(e){
    console.log(e);
  }
    res.status(httpStatus.OK).send();
  };

module.exports = {
  signup,
  login,
  googleSignup,
  googleSignupCallback,
  logout
};
