class PageView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
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
        const ctrl = this.props.ctrl;
        return this.getRowForms().map(form => {
            return this.renderForm(form);
        });
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
    /*renderTableForms() {
        return <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
            <div className="frame__container">
                <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
            </div>
        </div>;
    }*/
    getRowForms() {
        return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'RowForm');
    }
    getTableForms() {
        return this.getCtrl().forms.filter(form => form.getModel().getClassName() === 'TableForm');
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
    renderHeader() {
        const ctrl = this.props.ctrl;
        const model = ctrl.getModel();
        return <div className={`${this.getCssBlockName()}__header`}>
            {this.renderTitle()}
            {model.isModal() &&
                [
                    <svg key={'open'} className={`${this.getCssBlockName()}__open`} onClick={ctrl.onOpenPageClick} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>,
                    <svg key={'close'} className={`${this.getCssBlockName()}__close`} onClick={ctrl.onClosePageClick} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                ]
            }
        </div>;
    }
    render() {
        console.log('PageView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.getCtrl();
        const model = ctrl.getModel();
        return (
            <div className={`${this.getCssBlockName()} full flex-rows`}>
                {this.renderHeader()}
                <div className={`${this.getCssBlockName()}__main flex-max frame`}>
                    <div className="frame__container flex-rows grid-gap-10">
                        {this.isToolbar() && this.renderToolbar()}
                        {model.hasRowForm() && this.renderRowForms()}
                        {model.hasTableForm() && this.renderTableForms()}
                    </div>
                </div>
            </div>
        );
    }
}
window.QForms.PageView = PageView;
