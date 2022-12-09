import { ModelView } from '../ModelView';
export declare class PageView extends ModelView {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    renderHeader(): any;
    renderForms(): any;
    renderForm(formCtrl: any, props?: any): any;
}
