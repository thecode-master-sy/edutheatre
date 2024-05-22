
export default function responseObj(message: string, data: any, error: boolean = false){
    return {
        error: error,
        message: message,
        data: data
    }
}