const express = require('express');

// cors import
const cors = require('cors');

// to set data type
const bodyParser = require('body-parser');

// for mongodb
const mongoose = require('mongoose');

// for location path
const path = require('path');

// for image
const multer = require('multer');

// for data changes
const _ = require('lodash');

// Routes
const authRoutes = require('./routes/auth');

// For url logs
const morgan = require('morgan')

// config variables
const config = require('./config/config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';

const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// global config 
global.gConfig = finalConfig;

const app = express();

// middleware
require('./middleware/passport');
app.use(cors());
app.use(bodyParser.json());

// file storage location
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'assets/images')
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + '-' + file.originalname)
  },
})

// Image type filter
const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

// logger
app.use(morgan('dev'))

// for image storage
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

// image path url
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// Routes 
app.use('/auth', authRoutes);

// mongoose db connection
mongoose.connect(global.gConfig.URI, { useNewUrlParser: true })
  .then(() => {
    console.info(`DB connected Successfully on ======> ${global.gConfig.node_port}, ${global.gConfig.URI}`);
  })
  .catch(() => {
    console.error('DB connection failed ======>');
  })

// global error control
app.use((error, req, res, next) => {
  
  const status = error.statusCode || 500;
  const message = error.message;

  res.status(status).send(message);
})

app.listen(global.gConfig.node_port);