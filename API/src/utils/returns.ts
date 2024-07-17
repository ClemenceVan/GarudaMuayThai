import { Response, Request, NextFunction } from 'express';
import Doc from './documentation';

export interface IResponse<T> {
    success: boolean;
    data: T | string | undefined;
};

export const ReturnManager = (req : Request, res : Response, next : NextFunction) => {
    res.ret = function createResponse<T>(status : number, data?: T, options?: any) {
        let resp : IResponse<T>;
        status === 204 && (
            res.status(status).end()
        ) || (
            (resp = {
                success: status < 400,
                data: data
            }) &&
            res.status(status).json( {
                success: status < 400,
                data: typeof data === "string" ? req.t(data, options) : data 
            }) &&
            (process.env.NODE_ENV === 'test') && Doc.addReturn(req.route.path, {[status]: resp})
        );
    }
    return next();
}

export default ReturnManager;