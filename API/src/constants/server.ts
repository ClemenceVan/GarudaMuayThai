export const prefix = "[Server]: ";

export const setup = prefix + "Setting up ...";
export const envError = prefix + "FATAL : Unable to find .env file.";
export const setupError = prefix + "Error while starting server.";
export const started = prefix + "Running on http://"

export const dbConnected = prefix + "Connected to database ";
export const dbError = prefix + "Unable to connect to database.";

/* Config */
export const trustProxy = "trust proxy";
export const xPoweredBy = "x-powered-by";
export const jsonSpaces = "json spaces";
export const jsonLimit = "10kb";

/* Auth */
export const serverAuth = "x-server-auth";
export const accessToken = "access-token";
export const acceptLanguage = "accept-language";

/* Hooks */
export const open = "open";
export const error = "error";
export const save = "save";

/* Parser */
export const missingField = "error.400.parser.missingField"
export const invalidDateFormat = "error.400.parser.invalidDateFormat"
export const invalidType = "error.400.parser.invalidType"
export const notOneOf = "error.400.parser.notOneOf"
export const invalidLength = "error.400.parser.invalidLength"
export const invalidRegex = "error.400.parser.invalidRegex"
export const invalidLimit = "error.400.parser.invalidLimit"