export class ResponseBuilder {
    public static success(
        data: any = null, 
        message: string|null = null, 
        code: number = 200
    ): {
        meta: {
            code: number,
            status: 'success',
            message: string|null,
        },
        data: any
    } {
        return {
            meta: {
                code,
                status: 'success',
                message,
            },
            data
        }
    }

    public static error(
        data: any = null, 
        message: string|null = null, 
        code: number = 400
    ): {
        meta: {
            code: number,
            status: 'error',
            message: string|null,
        },
        data: any
    } {
        return {
            meta: {
                code,
                status: 'error',
                message,
            },
            data
        }
    }
}

