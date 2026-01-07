import { createLogger, format, transports } from 'winston';

const loggerInstance = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [new transports.Console()],
});

class Logger {
    info(message: string, ...optionalParams: any[]) {
        loggerInstance.info(message, ...optionalParams);
    }

    warn(message: string, ...optionalParams: any[]) {
        loggerInstance.warn(message, ...optionalParams);
    }

    error(message: string, ...optionalParams: any[]) {
        loggerInstance.error(message, ...optionalParams);
    }

    debug(message: string, ...optionalParams: any[]) {
        loggerInstance.debug(message, ...optionalParams);
    }

    log(message: string, ...optionalParams: any[]) {
        loggerInstance.info(message, ...optionalParams);
    }
}

export default new Logger();
