export const levels = ['debug', 'log', 'warn', 'error'];

/* const QFORMS_LOG_LEVEL =
    process.env.QFORMS_LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'log'); */

const level = levels.indexOf(getLogLevelName());

export function getLogLevelName() {
    if (typeof global === 'object') {
        return (
            process.env.QFORMS_LOG_LEVEL ||
            (process.env.NODE_ENV === 'development' ? 'debug' : 'log')
        );
    } else if (typeof window === 'object') {
        // @ts-ignore
        return window.QFORMS_LOG_LEVEL || 'debug';
    }
    return levels[0];
}

export function debug(message?: any, ...optionalParams: any[]) {
    if (level <= levels.indexOf('debug')) {
        // process.stdout.write(`${messages.join(' ')}\n`);
        console.debug(message, ...optionalParams);
    }
}

export function log(...messages: any[]) {
    if (level <= levels.indexOf('log')) {
        process.stdout.write(`${messages.join(' ')}\n`);
    }
}

export function warn(...messages: any[]) {
    if (level <= levels.indexOf('log')) {
        process.stdout.write(`${messages.join(' ')}\n`);
    }
}

export function error(...messages: any[]) {
    process.stderr.write(`${messages.join(' ')}\n`);
}
