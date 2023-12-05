declare namespace Express {
    export interface Request {
       userID?: number,
    role?: Map<string, string[]>
    }
 }