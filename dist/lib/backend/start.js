const { BackHostApp, Helper } = require('./index');
main();
async function main() {
    // console.log('main');
    const backHostApp = new BackHostApp(Helper.getCommandLineParams());
    try {
        await backHostApp.run();
    }
    catch (err) {
        await backHostApp.logError(err);
    }
}
