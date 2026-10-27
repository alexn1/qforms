import { ReactElement, ReactNode } from 'react';
import { ModelView } from '../ModelView';
import { ReactComponentProps } from '../../../../common';
import { PageController } from './PageController';
import { FormController } from '../FormController/FormController';
import './PageView.less';
export declare class PageView<TPageController extends PageController = PageController> extends ModelView<TPageController> {
    constructor(props: ReactComponentProps);
    render(): ReactNode;
    renderHeader(): ReactNode;
    onActionsClick: (li: HTMLElement) => Promise<void>;
    isToolbar(): boolean;
    getFormTabs(forms: FormController[]): {
        name: string;
        title: string;
        content: ReactNode;
    }[];
    getRowForms(): FormController[];
    getTableForms(): FormController[];
    renderForm(formCtrl: FormController, props?: Partial<ReactComponentProps>): ReactElement;
    renderRowForms(): ReactElement[];
    renderTitle(): ReactNode;
    renderSelectButton(): ReactNode;
    renderSaveAndCloseButton(): ReactNode;
    renderCloseButton(): ReactNode;
    renderActionsDropdownButton(): ReactNode;
    renderToolbar(): ReactNode;
    renderTableForms(): ReactNode;
    renderOpenPageHeaderButton(): ReactNode;
    renderClosePageHeaderButton(): ReactNode;
    renderMain(): ReactNode;
    renderForms(): ReactNode;
    renderForms2(): ReactNode;
    renderFooter(): ReactNode;
    componentDidMount(): void;
    focus(): void;
}
