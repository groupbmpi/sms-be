import { HttpException } from "./httpException";

export class UnauthorizedException extends HttpException {
    public static readonly MESSAGE = 'Unauthorized';

    public static readonly STATUS_CODE = 401;

    constructor(message: string = UnauthorizedException.MESSAGE) {
        super(
            UnauthorizedException.STATUS_CODE, 
            message
        );
    }
}
