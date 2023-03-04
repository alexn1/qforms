import { VisualController } from '../VisualController';
import { VisualView } from '../VisualView';
export declare class FieldController extends VisualController {
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
    getDocumentViewClass(): typeof VisualView;
}
