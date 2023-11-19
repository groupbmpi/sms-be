export abstract class HttpException extends Error {
    protected code: number;

    constructor(code: number, message: string) {
        super(message);

        this.code = code;
    }

    public getStatusCode() {
        return this.code;
    }

    public getMessage() {
        return this.message;
    }
}