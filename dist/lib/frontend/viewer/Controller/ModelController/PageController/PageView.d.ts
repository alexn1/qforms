import { ReactNode } from 'react';
import { ModelView } from '../ModelView';
import { PageController } from './PageController';
import './PageView.less';
export declare class PageView<TPageController extends PageController = PageController> extends ModelView<TPageController> {
    constructor(props: any);
    onActionsClick: (li: any) => Promise<void>;
    isToolbar(): boolean;
    getFormTabs(forms: any): any;
    getRowForms(): import("../FormController/FormController").FormController<import("../../../Model/Form/Form").Form>[];
    getTableForms(): import("../FormController/FormController").FormController<import("../../../Model/Form/Form").Form>[];
    renderForm(formCtrl: any, props?: {}): any;
    renderRowForms(): any;
    renderTitle(): ReactNode;
    renderSelectButton(): JSX.Element;
    renderSaveAndCloseButton(): JSX.Element;
    renderCloseButton(): JSX.Element;
    renderActionsDropdownButton(): JSX.Element;
    renderToolbar(): JSX.Element;
    renderTableForms(): any;
    renderOpenPageHeaderButton(): JSX.Element;
    renderClosePageHeaderButton(): JSX.Element;
    renderHeader(): JSX.Element;
    renderMain(): JSX.Element;
    renderForms(): any;
    renderForms2(): JSX.Element;
    renderFooter(): JSX.Element;
    getClassList(): string[];
    render(): JSX.Element;
    getStyle(): {
        width: number;
        height: number;
    };
    componentDidMount(): void;
    focus(): void;
}
