/* Modules */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Interfaces
import { TokenInterface } from '../interfaces/jwt';

/* Constants */
import {jwtSecret, invalidJwt, noJwt} from '../constants/routes';
import {accessToken} from '../constants/server';

export function getIdFromToken(token: string): string {
    const decoded = jwt.verify(token, jwtSecret) as TokenInterface;
    return decoded.id;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers[accessToken] as string;
    if (!token) return res.status(401).send(noJwt);
    try {
        // const decoded = jwt.verify(token, jwtSecret) as TokenInterface;
        req.session = {...req.session, id: getIdFromToken(token)};
        next();
    } catch (e) {
        return res.status(401).send(invalidJwt);
    }
};