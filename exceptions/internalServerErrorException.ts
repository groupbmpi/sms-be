import { HttpException } from "./httpException";

export class InternalServerErrorException extends HttpException {
    public static readonly MESSAGE = 'Internal Server Error';

    public static readonly STATUS_CODE = 500;

    constructor(message: string = InternalServerErrorException.MESSAGE) {
        super(
            InternalServerErrorException.STATUS_CODE, 
            message
        );
    }
}
