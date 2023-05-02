const { BkApplication } = require('../dist/backend');

const APP_FILE_PATH = './apps/mongo/mongo.json';

async function main() {
    console.log('main');

    const appInfo = await BkApplication.loadAppInfo(APP_FILE_PATH, null);
    // console.log('appInfo', appInfo);

    const bkHostApp = {};
    const context = {};

    const app = new BkApplication(appInfo, bkHostApp);
    // await app.init(context);
}
main();
