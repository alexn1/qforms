import { ModelController } from '../ModelController';
import { FormController } from '../FormController/FormController';
import { PageView } from './PageView';
import { ApplicationController, OpenPageOptions } from '../ApplicationController/ApplicationController';
import { Page, PageOptions } from '../../../Model/Page/Page';
export declare class PageController<TApplicationController extends ApplicationController = ApplicationController> extends ModelController<Page> {
    id: string;
    forms: FormController[];
    constructor(model: Page, parent: ApplicationController, id: string);
    static create(model: Page, parent: ApplicationController, id: string, options?: PageOptions): PageController;
    init(): void;
    deinit(): void;
    onSaveAndCloseClick: () => Promise<void>;
    onClosePageClick: (e: any) => Promise<void>;
    onOpenPageClick: (e: any) => Promise<void>;
    createOpenInNewLink(pageName: string, key: string): string;
    close(): Promise<void>;
    validate(): void;
    isValid(): boolean;
    onFormChange(e: any): Promise<void>;
    onFormDiscard(formController: FormController): void;
    onFormUpdate(e: any): void;
    onFormInsert(e: any): void;
    openPage(options: OpenPageOptions): Promise<PageController<ApplicationController>>;
    isChanged(): boolean;
    getApp(): TApplicationController;
    getViewClass(): typeof PageView;
    getForm<TFormController extends FormController = FormController>(name: string): TFormController;
    onActionClick(name: string): Promise<any>;
    onKeyDown: (e: any) => Promise<void>;
    getTitle(): string;
    getSelectedRowKey(): any;
    onSelectClick: (e: any) => Promise<void>;
    onResetClick: (e: any) => Promise<void>;
    selectRow(key: any): Promise<void>;
    invalidate(): void;
    getId(): string;
    isModal(): boolean;
    isAutoFocus(): boolean;
}
