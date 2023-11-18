import HttpException from "./httpException";

export class notFoundException extends HttpException {
    public static readonly MESSAGE = 'Not Found';

    public static readonly STATUS_CODE = 400;

    constructor(message: string = notFoundException.MESSAGE) {
        super(
            notFoundException.STATUS_CODE, 
            message
        );
    }
}
