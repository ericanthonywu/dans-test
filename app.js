const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet')
const rTracer = require('cls-rtracer');
const {defaultApiErrorhandler} = require("./middleware/authMiddleware");
const ResponseUtil = require("./utils/responseUtil");
const http = require('http');
const Env = require("./config/environment");
const DBConnection = require("./config/database/connection");
require('dotenv').config({path: ".env"});

const app = express();
app.use(rTracer.expressMiddleware());

(async (app) => {
  try {
    app.use(helmet())
    app.use((req, res, next) => {
      res.response = new ResponseUtil(res)
      next()
    })

    await Env.sanitizeValue()
    await new DBConnection().persistenceCheck()
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/api', require('./routes/index'));

    app.use((err, req, res, next) => {
      defaultApiErrorhandler(err, req, res)
    });

    const server = http.createServer(app);
    server.listen(Env.PORT);
  } catch (e) {
    console.error(`failed starting app with error`, e)
  }
})(app)