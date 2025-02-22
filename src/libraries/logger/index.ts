class Logger {
    info(message: string, ...optionalParams: any[]) {
        console.info(message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]) {
        console.warn(message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]) {
        console.error(message, ...optionalParams);
    }

    debug(message: string, ...optionalParams: any[]) {
        console.debug(message, ...optionalParams);
    }

    log(message: string, ...optionalParams: any[]) {
        console.log(message, ...optionalParams);
    }
}

export default new Logger();