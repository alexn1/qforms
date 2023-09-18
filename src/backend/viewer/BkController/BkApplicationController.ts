import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { pConsole } from '../../../pConsole';

export class BkApplicationController {
    /* async index(context: Context, bkApplication: BkApplication): Promise<void> {
        pConsole.debug('ViewerModule.index');
        const res = context.getRes();
        await bkApplication.connect(context);
        try {
            await bkApplication.initContext(context);
            const html = await this.renderHtml(bkApplication, context);
            res.setHeader('Content-Type', 'text/html; charset=utf-8').end(html);
        } finally {
            await bkApplication.release(context);
        }
    } */
}
