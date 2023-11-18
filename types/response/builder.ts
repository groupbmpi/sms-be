import { STATUS } from "./index";

class ResponseBuilder {
    constructor() {}

    err = (code: number, error?: any, message?: string) => {
        if(error) {
            return {
                status: STATUS[code],
                message: message? message: STATUS[code],
                error: error
            }
        } else {
            return {
                status: STATUS[code],
                message: message? message: STATUS[code]
            }
        }
    }

    success = (code: number, message: string, data?: any) => {
        if(data) {
            return {
                status: STATUS[code],
                message: message,
                data: data
            }
        } else {
            return {
                status: STATUS[code],
                message: message
            }
        }
    }
}

export default new ResponseBuilder;