import { EdVisualController } from '../EdVisualController';
import { EdDatabaseController } from '../../EdDatabaseController/EdDatabaseController';
import { EdPageLinkController } from '../../../EdPageLinkController/EdPageLinkController';
import { EdVisualView } from '../EdVisualView';
export declare class EdApplicationController extends EdVisualController {
    editorApp: any;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
    opened: boolean;
    items: any[];
    constructor(model: any, editorApp: any);
    init(): void;
    createDatabase(model: any): EdDatabaseController;
    createPageLink(model: any): EdPageLinkController;
    removeDatabase(databaseController: any): void;
    removePageLink(pageLinkController: any): void;
    getActions(): {
        action: string;
        caption: string;
    }[];
    doAction(name: any): Promise<void>;
    newDatabaseAction(): Promise<void>;
    newDataSourceAction(): Promise<void>;
    newPageAction(): Promise<void>;
    getPropList(): {
        list: any;
        options: {};
    };
    findPageLink(name: any): any;
    getDocumentViewClass(): typeof EdVisualView;
}
