import { HttpException } from "./httpException";

export class NotFoundException extends HttpException {
    public static readonly MESSAGE = 'Not Found';

    public static readonly STATUS_CODE = 400;

    constructor(message: string = NotFoundException.MESSAGE) {
        super(
            NotFoundException.STATUS_CODE, 
            message
        );
    }
}
