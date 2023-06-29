import { EdVisualController } from '../EdVisualController';
import { EdFormController } from '../EdFormController/EdFormController';
import { EdVisualView } from '../EdVisualView';
import { EdPageLinkController } from '../../../EdPageLinkController/EdPageLinkController';
export declare class EdPageController extends EdVisualController {
    options: any;
    forms: any[];
    items: any[];
    constructor(model: any, pageLinkController?: EdPageLinkController | null, options?: {});
    init(): void;
    createForm(model: any): EdFormController;
    removeForm(formController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    newDataSourceAction(): Promise<void>;
    actionNewForm(): Promise<void>;
    getPropList(): {
        list: any;
        options: {};
    };
    setProperty(name: any, value: any): Promise<void>;
    getPageLink(): any;
    delete(): Promise<void>;
    getDocumentViewClass(): typeof EdVisualView;
}
