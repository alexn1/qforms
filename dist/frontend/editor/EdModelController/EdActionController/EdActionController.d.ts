import { EdModelController } from '../EdModelController';
export declare class EdActionController extends EdModelController {
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    delete(): Promise<void>;
}
