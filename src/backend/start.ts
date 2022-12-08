import { BackHostApp, Helper } from './index';

async function main() {
    // console.log('main');
    const backHostApp = new BackHostApp({
        ...Helper.getCommandLineParams(),
        monitor: {
            username: 'admin',
            password: '123qwe',
        },
    });
    try {
        await backHostApp.run();
    } catch (err) {
        await backHostApp.logError(err);
    }
}
await main();
