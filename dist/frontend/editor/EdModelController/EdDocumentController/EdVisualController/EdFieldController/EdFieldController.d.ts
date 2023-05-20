import { EdVisualController } from '../EdVisualController';
import { EdVisualView } from '../EdVisualView';
export declare class EdFieldController extends EdVisualController {
    getTitle(): string;
    getStyle(): {
        color: string;
    };
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    actionChangeClass(): Promise<void>;
    getPropList(): {
        list: any;
        options: {};
    };
    delete(): Promise<void>;
    getDocumentViewClass(): typeof EdVisualView;
}
