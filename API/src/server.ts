/* Import monitoring */
// MUST BE THE FIRST IMPORT LEAVE IT HERE
// import dotenv from 'dotenv';
// dotenv.config();
// import * as appInsights from 'applicationinsights';
// appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY);

/* Modules */
import express, {Express} from 'express';
import path from 'path';

/* Utils */
import ReturnManager from './utils/returns';
import TranslationsHandler from './utils/translation';

// Functions
import setup from './setup';

// Routes
import {index} from './routes/v1/index';
import {protect} from './routes/v1/protected';

// Middlewares
import apiKeyMid from './middlewares/apiKey';
import jwtMid from './middlewares/jwt';

const app: Express = express();

/* Constants */
import {v1, asterisk} from './constants/endpoints';
import { notFound } from './constants/routes';
import { error } from './constants/I18n';

// Setup
setup(app);

app.use(ReturnManager);
app.use(TranslationsHandler);

/*  API ROUTES  */
// API Documentation
app.use('/v1/documentation', express.static('doc'))

// API Key check
app.use(v1, apiKeyMid);

// Public Routes
app.use(v1, index);

// Protected Routes
app.use(v1, jwtMid, protect)

/**
 * @api {all} / Parsers
 * @apiName Parsers
 * @apiGroup Developper informations
 * @apiVersion 1.0.0
 * 
 * @apiExample {json} Body sent
 * {
 *   "username": "adminnn",
 *   "password": "password",
 *   "email": "admin@aizy.com"
 * }
 * @apiExample Body parsed
 * TypeScript code that parses the request body:
 * 
 * const {username, password, email} = req.body;
*/

/**
 * @api {all} / Returns
 * @apiName Returns
 * @apiGroup Developper informations
 * @apiVersion 1.0.0
 * 
 * 
 * @apiExample {json} Received data
 * Example of returned data (in json format):
 * 
 * {
 *   "message": "Register successfull",
 *   "token": "{{token}}"
 * }
*/


/**
 * @api {all} /v1/* 404 Not Found
 * @apiName NotFound
 * @apiGroup Error
 * 
 * @apiError (Error 404) {String} message Not Found
 * @apiErrorExample 404 Not Found
 * HTTP/1.1 404 Not Found
 * not found
*/
app.all(asterisk, (req, res) => {
    return res.ret<string>(404, error[404].pageNotFound, {method: req.method, url: req.path});
})

export default app;
