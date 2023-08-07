export const levels = ['debug', 'log', 'warn', 'error'];

const QFORMS_LOG_LEVEL =
    process.env.QFORMS_LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'log');

const level = levels.indexOf(QFORMS_LOG_LEVEL);

export function debug(...messages: string[]) {
    if (level <= levels.indexOf('debug')) {
        process.stdout.write(`${messages.join(' ')}\n`);
    }
}

export function log(...messages: string[]) {
    if (level <= levels.indexOf('log')) {
        process.stdout.write(`${messages.join(' ')}\n`);
    }
}

export function warn(...messages: string[]) {
    if (level <= levels.indexOf('log')) {
        process.stdout.write(`${messages.join(' ')}\n`);
    }
}

export function error(...messages: string[]) {
    process.stderr.write(`${messages.join(' ')}\n`);
}
