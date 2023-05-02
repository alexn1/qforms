import { VisualController } from '../VisualController';
import { DatabaseController } from '../../DatabaseController/DatabaseController';
import { PageLinkController } from '../../../PageLinkController/PageLinkController';
import { VisualView } from '../VisualView';
export declare class ApplicationController extends VisualController {
    editorApp: any;
    databases: any[];
    dataSources: any[];
    actions: any[];
    pageLinks: any[];
    opened: boolean;
    items: any[];
    constructor(model: any, editorApp: any);
    init(): void;
    createDatabase(model: any): DatabaseController;
    createPageLink(model: any): PageLinkController;
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
    getDocumentViewClass(): typeof VisualView;
}
