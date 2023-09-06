export const LOG_LEVELS = ['debug', 'log', 'warn', 'error'];

export function getLogLevel() {
    return LOG_LEVELS.indexOf(getLogLevelName());
}

export function getLogLevelName() {
    if (typeof window === 'object') {
        // @ts-ignore
        return window.QFORMS_LOG_LEVEL || 'debug';
    } else if (typeof global === 'object') {
        return process.env.QFORMS_LOG_LEVEL || (process.env.NODE_ENV === 'dev' ? 'debug' : 'log');
    }
    return 'debug';
}

export function debug(message?: any, ...optionalParams: any[]) {
    if (getLogLevel() <= LOG_LEVELS.indexOf('debug')) {
        // process.stdout.write(`${messages.join(' ')}\n`);
        console.debug(message, ...optionalParams);
    }
}

export function log(message?: any, ...optionalParams: any[]) {
    if (getLogLevel() <= LOG_LEVELS.indexOf('log')) {
        // process.stdout.write(`${messages.join(' ')}\n`);
        console.log(message, ...optionalParams);
    }
}

export function warn(message?: any, ...optionalParams: any[]) {
    if (getLogLevel() <= LOG_LEVELS.indexOf('log')) {
        // process.stdout.write(`${messages.join(' ')}\n`);
        console.warn(message, ...optionalParams);
    }
}

export function error(message?: any, ...optionalParams: any[]) {
    // process.stderr.write(`${messages.join(' ')}\n`);
    console.error(message, ...optionalParams);
}
