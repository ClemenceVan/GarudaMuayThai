/* Modules */
import {Request, Response, NextFunction} from 'express';

/* Constants */
import {noKey, invalidKey} from '../constants/routes';
import {serverAuth} from '../constants/server';

export const SDKMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers[serverAuth] as string;
    if (!key) return res.status(401).send(noKey);
    if (key !== process.env.SDK_KEY) return res.status(401).send(invalidKey);
    next();
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers.authorization as string;
    if (!key) return res.status(401).send(noKey);
    if (key !== process.env.API_KEY) return res.status(401).send(invalidKey);
    next();
}