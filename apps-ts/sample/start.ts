import { inspect } from 'util';
import { BkHelper, Optional } from '../../dist';
import { SampleBackHostApp } from './index';
import { join } from 'path';

start(...process.argv).then((code) => {
    if (code) process.exit(code);
});

async function start(...argv: string[]): Promise<Optional<number>> {
    console.debug('start');
    // console.debug('global:', inspect(global));
    try {
        const backHostApp = new SampleBackHostApp({
            ...BkHelper.argvAsKeyValue(argv),
            appsDirPath: join(__dirname, '../'),
            port: 7001,
        });
        await backHostApp.init();
        await backHostApp.run();
    } catch (err) {
        console.error(err.message);
        return 1;
    }
}
