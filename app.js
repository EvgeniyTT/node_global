import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import config from './config/config.json';
import connectToDb from './dbm/connect';
import { fillUpMongoDb } from './dbm/utils';
import { connectToPostgresDb } from './dbp/connect';
import { fillUpPostgressDb } from './dbp/utils';
import {
  DirWatcher,
  Importer,
  Product,
  User,
} from './models';
import {
  queryParser,
  cookieParser,
  checkToken,
  passport,
} from './middlewares';
import {
  userRouter,
  productRouter,
  authRouter,
  loginRouter,
  cityRouter,
  apiUserRouter,
  apiProductRouter,
} from './routes';
import * as endpoints from './utils/endpoints';

const dataFolder = './data';

connectToDb();
fillUpMongoDb();
connectToPostgresDb();
fillUpPostgressDb();


const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer();

dirWatcher.on('changed', filePaths=> {
  filePaths.forEach(filePath =>  {
    importer.import(filePath)
      .then(file => console.log(`ASYNC: ${filePath} - ${JSON.stringify(file)}`))
      .catch(err => console.error(`Error on importing file by path ${filePath}: ${err}`));

    console.log(`SYNC: ${filePath} - ${JSON.stringify(importer.importSync(filePath))}`);
  });
});

dirWatcher.on('error', err => {
  console.error('Error in dirWatcher: ', err);
});

dirWatcher.watch(dataFolder, 1000);

const app = express();

app.use(queryParser);
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'my secret' 
}));

app.use(endpoints.AUTH_URL, authRouter);


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(endpoints.LOGIN_URL,
  passport.authenticate('local', { failureRedirect: endpoints.AUTH_URL }),
  loginRouter
);

// swagger api docs, served on the root / endpoint
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); } // Successful authentication, redirect home.
);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get(
  '/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); } // Successful authentication, redirect home.
);

// Mongo routes
app.use('/api/cities', cityRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/products', apiProductRouter);

app.use(checkToken);
// Postgres routes
app.use(endpoints.USERS_URL, userRouter);
app.use(endpoints.PRODUCTS_URL, productRouter);

// error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

export default app;
