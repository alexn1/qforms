import { ModelController } from '../ModelController';
export declare class ParamController extends ModelController {
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    static getView(view: any): Promise<any>;
    delete(): Promise<void>;
}
