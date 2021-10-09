class PageView extends ModelView {
    constructor(props) {
        super(props);
        this.checkParent();
    }
    getTabs() {
        const ctrl = this.props.ctrl;
        return ctrl.forms.filter(form => form.model.getClassName() === 'TableForm').map(form => {
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
        return ctrl.forms.filter(form => form.model.getClassName() === 'RowForm').map(form => {
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
                {/*{model.isModal() &&
                    <Button
                        key="close"
                        width={width}
                        title={model.getApp().getText().page.close}
                        onClick={ctrl.onClosePageClick}
                    />
                }*/}
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
    render() {
        console.log('PageView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.getModel();
        return (
            <div className={`${this.getCssBlockName()} full frame`}>
                <div className="frame__container flex-rows grid-gap-10">
                    {this.renderTitle()}
                    {this.isToolbar() && this.renderToolbar()}
                    {model.hasRowForm() && this.renderRowForms()}
                    {model.hasTableForm() &&
                        <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
                            <div className="frame__container">
                                <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                            </div>
                        </div>
                    }
                </div>
                {model.isModal() && <div className={`${this.getCssBlockName()}__close`} onClick={ctrl.onClosePageClick}>
                    <CloseIcon/>
                </div>}
            </div>
        );
    }
}
window.QForms.PageView = PageView;
