import { HttpException } from "./httpException";

export class ForbiddenException extends HttpException {
    public static readonly MESSAGE = 'Forbidden';

    public static readonly STATUS_CODE = 403;

    constructor(message: string = ForbiddenException.MESSAGE) {
        super(
            ForbiddenException.STATUS_CODE, 
            message
        );
    }
}
