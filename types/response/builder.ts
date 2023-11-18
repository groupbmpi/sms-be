export class ResponseBuilder {

    public static success(
        data: any = null, 
        message: string|null = null, 
        code: number = 200
    ) {
        return {
            code,
            status: 'success',
            message,
            data
        }
    }

    public static error(
        data: any = null, 
        message: string|null = null, 
        code: number = 400
    ) {
        return {
            code,
            status: 'error',
            message,
            data
        }
    }
}

