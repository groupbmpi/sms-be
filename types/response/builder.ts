export type ResponseMeta = {
    code: number,
    success: boolean,
    message: string,
} 

export type Response<T> = {
    meta : ResponseMeta
    data : T | null
}

export class ResponseBuilder {
    public static success<T>(
        data: T | null = null, 
        message: string = "", 
        code: number = 200
    ): Response<T> {
        return {
            meta: {
                code: code,
                success: true,
                message: message,
            },
            data: data
        }
    }

    public static error<T>(
        data: T | null = null, 
        message: string = "", 
        code: number = 400
    ): Response<T>{
        return {
            meta: {
                code: code,
                success: false,
                message: message
            },
            data: data
        }
    }
}

