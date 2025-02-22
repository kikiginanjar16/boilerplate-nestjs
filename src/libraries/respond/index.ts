export function respond(res: any, code: number, status: boolean, message: string, data?: any, meta?:any): any {
    return res.status(code).json({
        status,
        message,
        data,
        meta
    });
}