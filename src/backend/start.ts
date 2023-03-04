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
        const result = await backHostApp.run();
        if (result) {
            process.exit(result);
        }
    } catch (err) {
        await backHostApp.logError(err);
    }
}
main();
