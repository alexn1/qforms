import { BackHostApp, Helper } from './index';

main(); async function main() {
    const backHostApp = new BackHostApp(Helper.getCommandLineParams());
    try {
        await backHostApp.run();
    } catch (err) {
        await backHostApp.logError(err);
    }
}
