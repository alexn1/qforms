const { BkHelper } = require('../../dist');
const { SampleBackHostApp } = require('./index');

start(...process.argv).then((code) => {
    if (code) process.exit(code);
});

async function start(...argv) {
    console.debug('start');
    try {
        const backHostApp = new SampleBackHostApp({
            ...BkHelper.argvAsKeyValue(argv),
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        return 1;
    }
}
