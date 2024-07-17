import { Request, Response, NextFunction } from "express";
import t from "../config/i18n";

import { acceptLanguage } from "../constants/server";
import { comma } from "../constants/general";

export const TranslationsHandler = (req: Request, _: Response, next: NextFunction) => {
    const lng = req.headers[acceptLanguage] ? req.headers[acceptLanguage].split(comma)[0].trim() : undefined;
    // console.log(lng)
    !req.t &&
        (req.t = (key : string, options?: Record<string, any>) => {
            !options && (options = {});
            const opts = Object.keys(options);
            const optsLen = opts.length;
            for (let i = 0; i < optsLen; i++)
                options[opts[i]] = typeof options[opts[i]] === "string" ? t(options[opts[i]], {lng}) : options[opts[i]];
            return `${t(key, { lng, ...options })}`;
        });
    return next();
};

export default TranslationsHandler;