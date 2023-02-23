const { BkApplication } = require('../dist/lib/backend');

main();
async function main() {
    console.log('main');

    const appFilePath = './apps/mongo/mongo.json';

    const appInfo = await BkApplication.loadAppInfo(appFilePath, null);
    // console.log('appInfo', appInfo);

    const application = new BkApplication(appInfo, {}, {});
    // await application.init(context);

    // const app = new BkApplication();
}
