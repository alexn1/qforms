/*
 * Proxy Console (pConsole)
 */

export enum LogLevel {
    debug = 'debug',
    log = 'log',
    warn = 'warn',
    error = 'error',
}

export const LogLevels = [LogLevel.debug, LogLevel.log, LogLevel.warn, LogLevel.error];

export function getLogLevelName() {
    if (typeof window === 'object') {
        // @ts-ignore
        return window.QFORMS_LOG_LEVEL || 'debug';
    } else if (typeof global === 'object') {
        return (
            process.env.QFORMS_LOG_LEVEL ||
            (process.env.NODE_ENV === 'development' ? 'debug' : 'log')
        );
    }
    return 'debug';
}

export const pConsole = new Proxy(console, {
    get: function (target, prop, receiver) {
        // @ts-ignore
        if (typeof target[prop] === 'function') {
            return function (...args: any[]) {
                const methodLevel = LogLevels.indexOf(prop as LogLevel);
                const logLevel = LogLevels.indexOf(getLogLevelName());
                if (methodLevel >= logLevel) {
                    // @ts-ignore
                    return target[prop].apply(receiver, args);
                }
            };
        }
        // @ts-ignore
        return target[prop];
    },
});
