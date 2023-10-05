import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ParamScheme } from '../../../common/Scheme/ParamScheme';
import { Context } from '../../../Context';
export declare class BkParam extends BkModel<ParamScheme> {
    getValue(context?: Context): any;
    getApp(): BkApplication;
}
