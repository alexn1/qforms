import { BkModel } from '../BkModel';
import { BkApplication } from '../BkApplication/BkApplication';
import { ParamScheme } from '../../../common/Scheme/ParamScheme';
export declare class BkParam extends BkModel<ParamScheme> {
    getValue(): any;
    getApp(): BkApplication;
}
