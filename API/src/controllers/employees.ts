/* Modules */
import { Request, Response } from 'express';

/* Utils */
import Parser from '../utils/parser';
import TryCatch from '../utils/tryCatch';
import Doc from '../utils/documentation';

export default class Employees {
    static doc = TryCatch(async (req: Request, res: Response) => {
        Doc.saveMd();
        res.ret(200, Doc.get());
    });
}