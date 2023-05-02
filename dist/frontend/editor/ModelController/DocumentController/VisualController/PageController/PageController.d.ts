import { VisualController } from '../VisualController';
import { FormController } from '../FormController/FormController';
import { VisualView } from '../VisualView';
export declare class PageController extends VisualController {
    options: any;
    forms: any[];
    items: any[];
    constructor(model: any, pageLinkController?: any, options?: {});
    init(): void;
    createForm(model: any): FormController;
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
    getDocumentViewClass(): typeof VisualView;
}
