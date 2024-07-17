import { Request, Response } from "express";

/* Custom Errors */
import { CustomError } from "./customErrors";

export default function TryCatch(fn: Function) {
    return async (req: Request, res: Response) => {
        try {
            await fn(req, res);
        } catch (e) {
            if (e instanceof CustomError)
                return res.ret(400, e.message, e.options);
            console.error(e);
            res.ret(500, "error.500.internalError", { error: e });
        }
    }
}