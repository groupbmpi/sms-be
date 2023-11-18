import { HttpException } from "./httpException";

export class BadRequestException extends HttpException {
    public static readonly MESSAGE = 'Bad Request';

    public static readonly STATUS_CODE = 400;

    constructor(message: string = BadRequestException.MESSAGE) {
        super(
            BadRequestException.STATUS_CODE, 
            message
        );
    }
}
