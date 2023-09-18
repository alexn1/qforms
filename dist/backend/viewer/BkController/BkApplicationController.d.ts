import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { ViewerModule } from '../ViewerModule';
export declare class BkApplicationController {
    private viewerModule;
    constructor(viewerModule: ViewerModule);
    index(context: Context, bkApplication: BkApplication): Promise<void>;
    renderHtml(bkApplication: BkApplication, context: Context): Promise<string>;
    loginGet(context: Context, application: BkApplication): Promise<void>;
    loginPost(context: Context, application: BkApplication): Promise<void>;
    logout(context: Context, application: BkApplication): Promise<void>;
}
