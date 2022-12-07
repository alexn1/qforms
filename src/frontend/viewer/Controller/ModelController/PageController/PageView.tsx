import React from 'react';
import { ModelView } from '../ModelView';
import {
    Button,
    DropdownButton,
    MoreVertIcon,
    Tab2,
    OpenInNewIcon,
    CloseIcon2,
} from '../../../../common';

export class PageView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
        this.el = React.createRef();
    }
    onActionsClick = async li => {
        // console.log('PageView.onActionsClick:', li);
        const ctrl = this.getCtrl();
        const name = li.dataset.action;
        try {
            const result = await ctrl.onActionClick(name);
            if (!result) {
                throw new Error(`no handler for action '${name}'`);
            }
        } catch (err) {
            console.error(err);
            await this.getCtrl()
                .getApp()
                .alert({ message: err.message });
        }
    };
    isToolbar() {
        const model = this.getCtrl().getModel();
        return model.hasActions();
        //|| (model.isModal() && model.hasRowFormWithDefaultSqlDataSource())
        //|| model.isSelectMode();
    }
    getFormTabs(forms) {
        return forms.map(form => {
            return {
                name: form.getModel().getName(),
                title: form.getTitle(),
                content: this.renderForm(form),
            };
        });
    }
    getRowForms() {
        return this.getCtrl()
            .forms.filter(form => form.getModel().getClassName() === 'RowForm')
            .filter(form => form.isVisible());
    }
    getTableForms() {
        return this.getCtrl()
            .forms.filter(form => form.getModel().getClassName() === 'TableForm')
            .filter(form => form.isVisible());
    }
    renderForm(formCtrl, props = {}) {
        return React.createElement(formCtrl.getViewClass(), {
            parent: this,
            key: formCtrl.getModel().getName(),
            ctrl: formCtrl,
            onCreate: formCtrl.onViewCreate,
            updated: formCtrl.getUpdated(),
            ...props,
        });
    }
    renderRowForms() {
        return this.getRowForms().map(form => this.renderForm(form));
    }
    renderTitle() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <h1 className={`${this.getCssBlockName()}__title`}>
                {ctrl.getTitle()}
                {model.hasRowFormWithDefaultSqlDataSource() &&
                    (ctrl.isChanged() || model.hasNew()) && [
                        ' ',
                        <span key={'star'} className={`${this.getCssBlockName()}__star`}>
                            *
                        </span>,
                    ]}
            </h1>
        );
    }
    renderSelectButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <Button
                classList={['toolbar-button', 'default']}
                onClick={ctrl.onSelectClick}
                enabled={!!ctrl.getSelectedRowKey()}
            >
                {/*<DoneIcon/>*/}
                <div>{model.getApp().getText().page.select}</div>
            </Button>
        );
    }
    renderSaveAndCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <Button
                classList={['toolbar-button', 'default']}
                onClick={ctrl.onSaveAndCloseClick}
                enabled={ctrl.isValid() && (model.hasNew() || ctrl.isChanged())}
            >
                {/*<DoneIcon/>*/}
                <div>{model.getApp().getText().page.saveAndClose}</div>
            </Button>
        );
    }
    renderCloseButton() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <Button classList={['toolbar-button']} onClick={ctrl.onClosePageClick}>
                <div>{model.getApp().getText().page.close}</div>
            </Button>
        );
    }
    renderActionsDropdownButton() {
        return (
            <DropdownButton
                classList={['toolbar-dropdown-button']}
                actions={this.getActionsForDropdownButton()}
                onClick={this.onActionsClick}
            >
                <MoreVertIcon />
            </DropdownButton>
        );
    }
    renderToolbar() {
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <div className={`${this.getCssBlockName()}__toolbar`}>
                {/*{model.isSelectMode() &&
                    <Button classList={['toolbar-button']}
                        title={model.getApp().getText().page.reset}
                            onClick={ctrl.onResetClick}
                    />
                }*/}
                {model.hasActions() && this.renderActionsDropdownButton()}
            </div>
        );
    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return false;
    }*/
    renderTableForms() {
        const tableForms = this.getTableForms();
        if (tableForms.length === 1) {
            return this.renderForm(tableForms[0]);
        } else {
            return (
                <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
                    <div className="frame__container">
                        <Tab2
                            tabs={this.getFormTabs(tableForms)}
                            classList={['Tab-blue', 'full']}
                        />
                    </div>
                </div>
            );
        }
    }
    renderOpenPageHeaderButton() {
        const ctrl = this.getCtrl();
        return (
            <div
                key={'open'}
                className={`${this.getCssBlockName()}__open`}
                onClick={ctrl.onOpenPageClick}
            >
                <OpenInNewIcon />
            </div>
        );
    }
    renderClosePageHeaderButton() {
        const ctrl = this.getCtrl();
        return (
            <div
                key={'close'}
                className={`${this.getCssBlockName()}__close`}
                onClick={ctrl.onClosePageClick}
            >
                <CloseIcon2 />
            </div>
        );
    }
    renderHeader() {
        const model = this.getCtrl().getModel();
        return (
            <div className={`${this.getCssBlockName()}__header`}>
                {this.renderTitle()}
                {model.isModal() && [
                    ...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []),
                    this.renderClosePageHeaderButton(),
                ]}
            </div>
        );
    }
    renderMain() {
        return (
            <div className={`${this.getCssBlockName()}__main flex-max frame`}>
                <div className={'frame__container flex-column grid-gap-10'}>
                    {this.isToolbar() && this.renderToolbar()}
                    {this.renderForms()}
                </div>
            </div>
        );
    }
    renderForms() {
        const model = this.getCtrl().getModel();
        return [
            ...(model.hasRowForm() ? [this.renderRowForms()] : []),
            ...(model.hasTableForm() ? [this.renderTableForms()] : []),
        ];
    }
    renderForms2() {
        return (
            <Tab2
                tabs={this.getFormTabs(this.getCtrl().forms.filter(form => form.isVisible()))}
                classList={['Tab-blue', 'full']}
            />
        );
    }
    renderFooter() {
        const model = this.getCtrl().getModel();
        return (
            <div className={`${this.getCssBlockName()}__footer`}>
                {this.renderCloseButton()}
                {model.isModal() &&
                    model.hasRowFormWithDefaultSqlDataSource() &&
                    this.renderSaveAndCloseButton()}
                {model.isSelectMode() && this.renderSelectButton()}
            </div>
        );
    }
    render() {
        console.log(
            'PageView.render',
            this.getCtrl()
                .getModel()
                .getFullName(),
        );
        return (
            <div
                className={`${this.getCssClassNames()} ${
                    this.getCtrl().isModal() ? '' : 'full'
                } flex-column`}
                style={this.getStyle()}
                ref={this.el}
                tabIndex={0}
                onKeyDown={this.getCtrl().onKeyDown}
            >
                {this.renderHeader()}
                {this.renderMain()}
                {this.getCtrl().isModal() && this.renderFooter()}
            </div>
        );
    }
    getStyle() {
        if (this.getCtrl().isModal()) {
            return {
                width: 1000,
                height: 750,
            };
        }
    }
    componentDidMount() {
        // console.log('PageView.componentDidMount', this.getCtrl().getModel().getFullName());
        if (
            this.getCtrl().isAutoFocus() &&
            !this.getCtrl()
                .getModel()
                .getKey()
        ) {
        } else {
            this.focus();
        }
    }
    focus() {
        // console.log('PageView.focus', this.getCtrl().getModel().getFullName());
        if (this.getElement()) {
            // console.log('focus', this.getElement());
            this.getElement().focus();
        } else {
            console.error(
                `${this.getCtrl()
                    .getModel()
                    .getFullName()}: el is null (ref={this.el})`,
            );
        }
    }
}

// @ts-ignore
window.PageView = PageView;
