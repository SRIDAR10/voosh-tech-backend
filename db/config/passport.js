const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const UserModel = require("../models/User.model");

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});


const googleStrategy = new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://voosh-tech.vercel.app/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
  try {
    let user = await UserModel.findOne({ where: { google_id: profile.id } });
    if (!user) {
      console.log(profile);
      user = await UserModel.create({ google_id: profile.id, email: profile.emails[0].value, firstName:profile?.name?.givenName ?? "",lastName : profile?.name?.familyName ?? "", sso:true, password : null });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

