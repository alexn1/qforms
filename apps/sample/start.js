const { inspect } = require('util');
const { BkHelper } = require('../../dist');
const { SampleBackHostApp } = require('./index');

start(...process.argv).then((code) => {
    if (code) process.exit(code);
});

async function start(...argv) {
    console.debug('start');
    // console.debug('global:', inspect(global));
    try {
        const params = BkHelper.argvAsKeyValue(argv);
        const backHostApp = new SampleBackHostApp({
            ...params,
            port: params.port ? parseInt(params.port) : undefined,
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        return 1;
    }
}
