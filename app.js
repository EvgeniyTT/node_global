import express from 'express';
import bodyParser from 'body-parser';
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
  mongoUserRouter,
  mongoProductRouter,
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

app.use(endpoints.AUTH_URL, authRouter);


// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(endpoints.LOGIN_URL,
  passport.authenticate('local', { failureRedirect: endpoints.AUTH_URL }),
  loginRouter
);

// Mongo routes
app.use('/api/cities', cityRouter);
app.use('/api/users', mongoUserRouter);
app.use('/api/products', mongoProductRouter);

// app.use(checkToken); commented out for easier testing

// Postgres routes
app.use(endpoints.USERS_URL, userRouter);
app.use(endpoints.PRODUCTS_URL, productRouter);

app.get('/', (req, res) => {
  res.send(`Available endpoints are: ${Object.keys(endpoints).map(key => endpoints[key]).join(', ')}`);
});

// error handler, no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});

export default app;
