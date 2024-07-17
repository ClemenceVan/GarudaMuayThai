import mongoose from 'mongoose';

// Strings
import {dbConnected, dbError, open, error} from '../constants/server';

export default async () => {
    // Configure mongoose to use Promises, because callbacks are passe.
    mongoose.Promise = global.Promise;

    const uri = process.env.DB_URI
    if (!uri)
        throw new Error('DB_URI not set');
    mongoose.connect(uri + process.env.NODE_ENV);
    return new Promise((resolve, reject) => {
        mongoose.connection
            .once(open, () => {
                console.log(dbConnected + process.env.NODE_ENV);
                resolve(null);
            })
            .on(error, (error) => {
                console.log(dbError);
                console.log(error);
                reject(error);
            });
    });
}