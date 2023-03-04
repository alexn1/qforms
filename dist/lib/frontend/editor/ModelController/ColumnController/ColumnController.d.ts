import { ModelController } from '../ModelController';
export declare class ColumnController extends ModelController {
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    static getView(view: any): Promise<any>;
    getPropList(): {
        list: any;
        options: {};
    };
    delete(): Promise<void>;
}
