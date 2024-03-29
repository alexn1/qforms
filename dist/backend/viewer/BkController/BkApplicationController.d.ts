import { Context } from '../../Context';
import { BkApplication } from '../BkModel/BkApplication/BkApplication';
import { ViewerModule } from '../ViewerModule';
import { BkModel } from '../BkModel/BkModel';
export declare class BkApplicationController {
    private viewerModule;
    constructor(viewerModule: ViewerModule);
    index(context: Context, bkApplication: BkApplication): Promise<void>;
    loginGet(context: Context, application: BkApplication): Promise<void>;
    loginPost(context: Context, application: BkApplication): Promise<void>;
    logout(context: Context, application: BkApplication): Promise<void>;
    rpc(context: Context, application: BkApplication): Promise<void>;
    static getModel(context: Context, application: BkApplication): Promise<BkModel>;
}
