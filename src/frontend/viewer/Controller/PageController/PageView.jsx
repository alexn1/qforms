class PageView extends View {
    getTabs() {
        const ctrl = this.props.ctrl;
        return ctrl.forms.filter(form => form.model.getClassName() === 'TableForm').map(form => {
            return {
                name   : form.model.getName(),
                title  : form.model.getCaption(),
                content: PageView.renderForm(form)
            };
        });
    }
    static renderForm(formCtrl) {
        return React.createElement(formCtrl.getViewClass(), {
            key     : formCtrl.model.getName(),
            ctrl    : formCtrl,
            onCreate: formCtrl.onViewCreate,
            updated : formCtrl.getUpdated()
        });
    }
    renderRowForms() {
        const ctrl = this.props.ctrl;
        return ctrl.forms.filter(form => form.model.getClassName() === 'RowForm').map(form => {
            return PageView.renderForm(form);
        });
    }
    renderCaption() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const key = model.getKey();
        let caption = ctrl.getCaption();
        if (ApplicationController.isInDebugMode()) {
            caption += ` (${model.getId()})`;
        }
        if (key) {
            caption += ` ${key}`;
        }
        if (ctrl.isChanged() || model.hasNew()) {
            return [caption, ' ', <span key={'star'} className="star">*</span>];
        }
        return caption;
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
            <div className={'PageView__toolbar'}>
                {model.hasRowFormWithDefaultSqlDataSource() &&
                    <Button
                        key="saveAndClose"
                        width={width}
                        title={model.getApp().getText().page.saveAndClose}
                        onClick={ctrl.onSaveAndCloseClick}
                        enabled={ctrl.isValid() && (model.hasNew() || (ctrl.isChanged()))}
                    />
                }
                {model.isModal() &&
                    <Button
                        key="close"
                        width={width}
                        title={model.getApp().getText().page.close}
                        onClick={ctrl.onClosePageClick}
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
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    render() {
        console.log('PageView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className="PageView full frame">
                <div className="frame__content flex-rows">
                    <h3 className="PageView__caption">{this.renderCaption()}</h3>
                    {/*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/ this.renderToolbar()}
                    {model.hasRowForm() && this.renderRowForms()}
                    {model.hasTableForm() &&
                        <div className="PageView__table-forms flex-max frame">
                            <div className="frame__content">
                                <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
window.QForms.PageView = PageView;
