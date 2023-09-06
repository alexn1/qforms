import { BackHostApp, BkHelper, Optional } from './index';
import { pConsole } from './pConsole';

const MONITOR_CONFIG = {
    username: 'admin',
    password: '123qwe',
} as const;

start(...process.argv).then((code) => {
    if (code) process.exit(code);
});

async function start(...argv: string[]): Promise<Optional<number>> {
    pConsole.debug('start');
    try {
        const backHostApp = new BackHostApp({
            ...BkHelper.argvAsKeyValue(argv),
            monitor: MONITOR_CONFIG,
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        return 1;
    }
}
