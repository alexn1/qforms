import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
import { ApplicationData } from '../../common/ModelData/ApplicationData';
export interface HomeProps {
    context: Context;
    platformVersion: string;
    application: BkApplication;
    appData: ApplicationData;
    applicationController: ApplicationController;
    linksMarkup: string;
    scriptsMarkup: string;
    appViewMarkup: string;
}
export declare function home({ context, platformVersion, application, appData, applicationController, linksMarkup, scriptsMarkup, appViewMarkup, }: HomeProps): string;
