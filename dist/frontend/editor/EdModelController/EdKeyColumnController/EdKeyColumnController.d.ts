import { EdModelController } from '../EdModelController';
export declare class EdKeyColumnController extends EdModelController {
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    static getView(view: any): Promise<any>;
    delete(): Promise<void>;
}
