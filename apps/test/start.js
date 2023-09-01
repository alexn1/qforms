const { BackHostApp, BkHelper } = require('../../dist');

require('./TestBkApplication');

require('./public/js/TestApplicationController');
require('./public/js/PersonsPersonsFirstNameTableFormTextBoxFieldView');

async function start(...argv) {
    console.debug('start');
    try {
        const backHostApp = new BackHostApp({
            ...BkHelper.argvAsKeyValue(argv),
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        return 1;
    }
}

start(...process.argv).then((code) => {
    if (code) process.exit(code);
});
