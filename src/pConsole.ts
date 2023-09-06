/*
 * Proxy Console (pConsole)
 */

const LOG_LEVEL_EV_NAME = 'QFORMS_LOG_LEVEL';

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
        return window[LOG_LEVEL_EV_NAME] || 'debug';
    } else if (typeof global === 'object') {
        return process.env[LOG_LEVEL_EV_NAME] || (process.env.NODE_ENV === 'dev' ? 'debug' : 'log');
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
