import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
export declare const index: (qformsVersion: string, application: BkApplication, context: Context, data: any, links: string, scripts: string, appViewHtml: string, applicationController: ApplicationController) => string;
