import { EdModelController } from '../EdModelController';
export declare class EdColumnController extends EdModelController {
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
