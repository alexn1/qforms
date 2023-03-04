import { ModelController } from '../ModelController';
export declare class ActionController extends ModelController {
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    delete(): Promise<void>;
}
