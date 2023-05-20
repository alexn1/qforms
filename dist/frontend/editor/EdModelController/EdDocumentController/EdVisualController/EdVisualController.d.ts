import { EdDocumentController } from '../EdDocumentController';
import { EdDataSourceController } from '../EdDataSourceController/EdDataSourceController';
import { EdActionController } from '../../EdActionController/EdActionController';
export declare class EdVisualController extends EdDocumentController {
    data: any;
    dataSources: any[];
    actions: any[];
    pageLinkController: any;
    constructor(model: any, parent?: any);
    createDocument(): Promise<any>;
    onControllerSave(value: any): Promise<void>;
    onCreateCustomController: (e: any) => Promise<void>;
    onCreateCustomView: (e: any) => Promise<void>;
    onCreateCustomStyle: (e: any) => Promise<void>;
    onCreateModelBack: (e: any) => Promise<void>;
    createDataSource(model: any): EdDataSourceController;
    removeDataSource(dataSourceController: any): void;
    createAction(model: any): EdActionController;
    removeAction(actionController: any): void;
    actionNewAction(): Promise<void>;
}
