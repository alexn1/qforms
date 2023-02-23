import { ModelView } from '../ModelView';
import { ReactNode } from 'react';
import { PageController } from './PageController';
export declare class PageView extends ModelView<PageController> {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    renderHeader(): any;
    renderForms(): any;
    renderForm(formCtrl: any, props?: any): any;
    renderTitle(): ReactNode;
}
