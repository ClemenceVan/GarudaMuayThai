declare global {
    namespace Express {
        export interface Request {
            'access-token': string,
            session: {
                id?: String;
            }
            id: String;
            t: (key: string, options?: Record<string, any>) => string;
        }
        export interface Response {
            ret: <T>(status: number, data?: T, options?: Record<string, any>) => void;
        }
    }
}
export {}
