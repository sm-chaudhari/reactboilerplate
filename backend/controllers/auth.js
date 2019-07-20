const passport = require('passport');

const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  passport.authenticate('signup', async (error, user) => {  
    try {
      if (error) {
        if(error.Error && error.statusCode) {
          const error = new Error(error.Error);
          error.statusCode = error.statusCode
        } else {
          const error = new Error("Internal server error");
          error.statusCode = 500
        }
        
        throw error;
      }

      res.status(200).json({
        message: 'Signup successful',
        user: user
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured')
        error.statusCode = 401;
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, 'top_secret');

        return res.status(200).json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};