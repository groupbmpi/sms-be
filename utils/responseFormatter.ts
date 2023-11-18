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
        ResponseFormatter.response.meta = {
            code,
            status,
            message
        };
        ResponseFormatter.response.data = data;
    }

    public static success(
        data: any = null, 
        message: string|null = null, 
        code: number = 200
    ) {
        ResponseFormatter.setResponse(
            code,
            'success',
            message,
            data
        );

        return ResponseFormatter.response;
    }

    public static error(
        data: any = null, 
        message: string|null = null, 
        code: number = 400
    ) {
        ResponseFormatter.setResponse(
            code,
            'error',
            message,
            data
        );

        return ResponseFormatter.response;
    }
}

export default ResponseFormatter;