class PageView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
    }
    renderForm(formCtrl, props = {}) {
        return React.createElement(formCtrl.getViewClass(), {
            parent  : this,
            key     : formCtrl.getModel().getName(),
            ctrl    : formCtrl,
            onCreate: formCtrl.onViewCreate,
            updated : formCtrl.getUpdated(),
            ...props
        });
    }
    renderRowForms() {
        return this.getRowForms().map(form => this.renderForm(form));
    }
    renderTitle() {
        const ctrl = this.props.ctrl;
        const model = ctrl.getModel();
        return <h1 className={`${this.getCssBlockName()}__title`}>
            {ctrl.getTitle()}
            {model.hasRowFormWithDefaultSqlDataSource() && (ctrl.isChanged() || model.hasNew()) &&
                [' ', <span key={'star'} className={`${this.getCssBlockName()}__star`}>*</span>]
            }
        </h1>;
    }
    onActionsClick = async li => {
        // console.log('PageView.onActionsClick:', li);
        const ctrl = this.props.ctrl;
        const name = li.dataset.action;
        const result = await ctrl.onActionClick(name);
        if (!result) {
            throw new Error(`no handler for action '${name}'`);
        }
    }
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = 150;
        return (
            <div className={`${this.getCssBlockName()}__toolbar`}>
                {model.options.selectMode &&
                    <Button title={model.getApp().getText().page.select}
                        onClick={ctrl.onSelectClick}
                        enabled={!!ctrl.getSelectedRowKey()}
                    />
                }
                {model.options.selectMode &&
                    <Button title={model.getApp().getText().page.reset}
                            onClick={ctrl.onResetClick}
                    />
                }
                {model.isModal() && model.hasRowFormWithDefaultSqlDataSource() &&
                    <Button
                        width={width}
                        title={model.getApp().getText().page.saveAndClose}
                        onClick={ctrl.onSaveAndCloseClick}
                        enabled={ctrl.isValid() && (model.hasNew() || (ctrl.isChanged()))}
                    />
                }
                {model.hasActions() &&
                    <DropdownButton
                        title={model.getApp().getText().page.actions}
                        actions={this.getActionsForDropdownButton()}
                        onClick={this.onActionsClick}
                    />
                }
            </div>
        );
    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return false;
    }*/
    isToolbar() {
        const model = this.getCtrl().getModel();
        return model.options.selectMode
            || (model.isModal() && model.hasRowFormWithDefaultSqlDataSource())
            || model.hasActions();
    }
    renderTableForms() {
        const tableForms = this.getTableForms();
        if (tableForms.length === 1) {
            return this.renderForm(tableForms[0]);
        } else {
            return <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
                <div className="frame__container">
                    <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                </div>
            </div>;
        }
    }
    getTabs() {
        return this.getTableForms().map(form => {
            return {
                name   : form.model.getName(),
                title  : form.getTitle(),
                content: this.renderForm(form)
            };
        });
    }
    getRowForms() {
        return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'RowForm');
    }
    getTableForms() {
        return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'TableForm');
    }
    renderOpenPageHeaderButton() {
        const ctrl = this.props.ctrl;
        return <div key={'open'} className={`${this.getCssBlockName()}__open`} onClick={ctrl.onOpenPageClick}>
            <OpenInNewIcon/>
        </div>;
    }
    renderClosePageHeaderButton() {
        const ctrl = this.props.ctrl;
        return <div key={'close'} className={`${this.getCssBlockName()}__close`} onClick={ctrl.onClosePageClick}>
            <CloseIcon2/>
        </div>;
    }
    renderHeader() {
        const ctrl = this.props.ctrl;
        const model = ctrl.getModel();
        return <div className={`${this.getCssBlockName()}__header`}>
            {this.renderTitle()}
            {model.isModal() &&
                [
                    ...(model.getKey() ? [this.renderOpenPageHeaderButton()] : []),
                    this.renderClosePageHeaderButton()
                ]
            }
        </div>;
    }
    renderMain() {
        const model = this.getCtrl().getModel();
        return <div className={`${this.getCssBlockName()}__main flex-max frame`}>
            <div className="frame__container flex-rows grid-gap-10">
                {this.isToolbar() && this.renderToolbar()}
                {model.hasRowForm() && this.renderRowForms()}
                {model.hasTableForm() && this.renderTableForms()}
            </div>
        </div>;
    }
    renderFooter() {
    }
    render() {
        console.log('PageView.render', this.getCtrl().getModel().getFullName());
        return (
            <div className={`${this.getCssClassNames()} full flex-rows`}>
                {this.renderHeader()}
                {this.renderMain()}
                {this.renderFooter()}
            </div>
        );
    }
}
window.QForms.PageView = PageView;
