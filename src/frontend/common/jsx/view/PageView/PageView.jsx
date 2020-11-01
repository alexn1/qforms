class PageView extends ReactComponent {
    getTabs() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'TableForm').map(name => {
            const form = model.forms[name];
            const formController = ctrl.forms[name];
            return {
                name   : form.getName(),
                title  : form.data.caption,
                content: React.createElement(formController.getViewClass(),{
                    key     : name,
                    ctrl    : ctrl.forms[name],
                    onCreate: formController.onViewCreate,
                    updated : formController.getUpdated()
                })
            };
        });
    }
    renderRowForms() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'RowForm').map(name => {
            const formController = ctrl.forms[name];
            return React.createElement(formController.getViewClass(), {
                key     : name,
                ctrl    : formController,
                onCreate: formController.onViewCreate,
                updated : formController.getUpdated()
            });
        });
    }
    renderCaption() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const key = model.getKey();
        let caption = model.getCaption();
        if (ApplicationController.isInDebugMode()) {
            caption += `(${model.id})`;
        }
        if (key) {
            caption += ` ${key}`;
        }
        if (ctrl.isChanged() || model.hasNew()) {
            return [caption, ' ', <span key={'star'} className="star">*</span>];
        }
        return caption;
    }
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = '150px';
        return (
            <div className="toolbar">
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
            <div className="PageView full place">
                <div className="frame flex-rows">
                    <h3 className="caption flex-min">{this.renderCaption()}</h3>
                    {model.hasRowFormWithDefaultDs() && this.renderToolbar()}
                    {model.hasRowForm() && this.renderRowForms()}
                    {model.hasTableForm() &&
                        <div className="table-forms flex-max place">
                            <div className="frame">
                                <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
