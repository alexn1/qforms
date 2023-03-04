import { DocumentController } from '../DocumentController';
import { DataSourceController } from '../DataSourceController/DataSourceController';
import { ActionController } from '../../ActionController/ActionController';
export declare class VisualController extends DocumentController {
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
    createDataSource(model: any): DataSourceController;
    removeDataSource(dataSourceController: any): void;
    createAction(model: any): ActionController;
    removeAction(actionController: any): void;
    actionNewAction(): Promise<void>;
}
