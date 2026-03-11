export interface ApiResponsePayload<TData = unknown, TMeta = unknown> {
    status: boolean;
    message: string;
    data?: TData;
    meta?: TMeta;
}

export function buildResponse<TData = unknown, TMeta = unknown>(
    status: boolean,
    message: string,
    data?: TData,
    meta?: TMeta,
): ApiResponsePayload<TData, TMeta> {
    return {
        status,
        message,
        data,
        meta,
    };
}

export function respond(
    res: any,
    code: number,
    status: boolean,
    message: string,
    data?: unknown,
    meta?: unknown,
): any {
    const payload = buildResponse(status, message, data, meta);
    const reply = res.status(code);
    if (typeof reply.send === 'function') {
        return reply.send(payload);
    }
    return reply.json(payload);
}
