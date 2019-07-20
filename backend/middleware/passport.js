const UserModel = require('../models/auth');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  try {
    // uncomment this code to support image field validation
    // if (!req.file) {
    //   const error = new Error("No image specified.");
    //   error.statusCode = 422
    //   throw error;
    // }

    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: email,
      password: password,
      // profilePictureUrl: req.file.path  // remove comment after uncommenting image field validation
    }

    const check_email = await UserModel.findOne({ email: data.email}).exec();
    if(check_email !== null) {
      const error = new Error("This email is already registered.");
      error.statusCode = 409
      throw error;
    }
    

    let user = await new UserModel(data).save();
    
    done(null, user)
  } catch (error) {
    done(error)
  }
}));

passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404
      throw error;
    }
    const validate = await user.isValidPassword(password);
    if (!validate) {
      const error = new Error("Password is incorrect.");
      error.statusCode = 403
      throw error;
    }
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    done(error)
  }
}));

passport.use(new JWTstrategy({
  secretOrKey: 'top_secret',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));