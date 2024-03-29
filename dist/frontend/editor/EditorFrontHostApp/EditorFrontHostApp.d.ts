import { FrontHostApp } from '../../common/FrontHostApp';
import { EdModalController } from '../EdModalController/EdModalController';
export declare class EditorFrontHostApp extends FrontHostApp {
    static editorApp: any;
    data: any;
    runAppLink: string;
    view: any;
    actionList: any;
    treeWidget2: any;
    pg: any;
    items: any;
    tabWidget: any;
    documents: any[];
    modal: EdModalController | null;
    constructor(data: any, runAppLink: string);
    run(): Promise<void>;
    deinit(): void;
    onItemOpen2: (item: any) => Promise<void>;
    onItemSelect2: (item: any) => Promise<void>;
    fillPropertyGrid(ctrl: any): void;
    onPropertyGrid2Change: (name: any, value: any) => void;
    beginEdit(obj: any, options: any): void;
    endEdit(): void;
    static fetchPageData(fileName: any): Promise<any>;
    fillActions(item: any): void;
    clearActions(): void;
    onItemDoubleClick2: (item: any) => Promise<void>;
    openDocument(controller: any): Promise<void>;
    findDocument(controller: any): any;
    onDocumentClose: (i: any) => void;
    openModal(modalController: EdModalController): Promise<void>;
    onModalClose(): Promise<void>;
    onActionClick: (actionName: any) => Promise<void>;
}
