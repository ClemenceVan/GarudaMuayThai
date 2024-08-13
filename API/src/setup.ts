/* Modules */
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import cors from 'cors';

/* Constants */
import {setup, envError, started, setupError,
trustProxy, xPoweredBy, prefix, jsonLimit} from './constants/server';

// Functions
import db from './config/database';

const setupServer = function (server: Express) {
    try {
        console.log(setup);
        if (dotenv.config().error) {
            console.log(envError);
            // process.exit(1);
        }
        console.log(prefix + "Starting in " + process.env.NODE_ENV + " mode");
        /*
        ** This line lets us log the remote address of any logged request
        */
        server.enable(trustProxy);
        server.disable(xPoweredBy); // Remove server source || Easy sourcing == easy attack

        /*
        ** Telling the server to use the following modules
        */
        server.use(bodyParser.json());
        server.set(jsonLimit, 2);
        server.use(
            express.json({
                limit: jsonLimit,
            })
        ); // Body limit is 10kb
        server.use(cors());
        server.use(mongoSanitize());

        // Connect to database
        db();
        server.listen(process.env.NODE_ENV == 'test' ? 0 : process.env.PORT, () => console.log(started + process.env.PORT));
    } catch (e) {
        console.log(setupError);
        console.log(e);
        process.exit(1);
    }
};

export default setupServer;