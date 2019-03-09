import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { decodeToken } from '../utils/jwt';
import { users } from '../helpers/fakeData';

export const checkToken = (req, res, next) => {
  try {
    const decode = decodeToken(req.headers.token);
    req.userId = decode._doc.id;
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new localStrategy(
  (username, password, cb) => {
    const user = users.find(v => v.login === username && v.pass === password);
    if (!user) { return cb(null, false); }
    return cb(null, user);
  }
));

passport.use(
  new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback'
  },
  (token, tokenSecret, profile, done) => {
    users.push(profile);
    done(null, profile);
  })
);

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'https://127.0.0.1:8080/auth/facebook/callback'
},
(accessToken, refreshToken, profile, done) => {
  users.push(profile);
  done(null, profile);
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  users.push(profile);
  done(null, profile);
}
));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  const user = users.find(v => v.id === id);
  cb(null, user);
});

export { passport };
