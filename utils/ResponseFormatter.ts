class ResponseFormatter {
    private static response: {
        meta: {
            code: number,
            status: 'success'|'error',
            message: string|null,
        },
        data: any
    }

    private static setResponse(
        code: number,
        status: 'success'|'error',
        message: string|null,
        data: any
    ): void {
        this.response.meta = {
            code,
            status,
            message
        };
        this.response.data = data;
    }

    public static success(
        data: any = null, 
        message: string|null = null, 
        code: number = 200
    ) {
        this.setResponse(
            code,
            'success',
            message,
            data
        );

        return this.response;
    }

    public static error(
        data: any = null, 
        message: string|null = null, 
        code: number = 400
    ) {
        this.setResponse(
            code,
            'error',
            message,
            data
        );

        return this.response;
    }
}