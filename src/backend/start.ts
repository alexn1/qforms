import { BackHostApp } from './index';

function getCommandLineParams() {
    return process.argv
        .map(arg => arg.split('='))
        .reduce((acc, [name, value]) => {
            acc[name] = value;
            return acc;
    }, {});
}

main(); async function main() {
    const backHostApp = new BackHostApp(getCommandLineParams());
    try {
        await backHostApp.run();
    } catch (err) {
        await backHostApp.logError(null, err);
    }
}
