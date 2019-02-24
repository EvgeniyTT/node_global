import passport from 'passport';
import { Strategy } from 'passport-local';
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
passport.use(new Strategy(
  (username, password, cb) => {
    const user = users.find(v => v.login === username && v.pass === password);
    if (!user) { return cb(null, false); }
    return cb(null, user);
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
