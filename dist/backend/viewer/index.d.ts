import { ApplicationController } from '../../frontend/viewer/Controller/ModelController/ApplicationController/ApplicationController';
import { Context } from '../Context';
import { BkApplication } from './BkModel/BkApplication/BkApplication';
export declare const index: (application: BkApplication, context: Context, applicationController: ApplicationController, qformsVersion: string, links: string, scripts: string, data: any, appViewHtml: string) => string;