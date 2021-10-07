class RowFormView extends FormView {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const ctrl = this.props.ctrl;
        const text = ctrl.getModel().getApp().getText();
        const width = '120px';
        return (
            <div className={`${this.getCssBlockName()}__toolbar`}>
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="edit"
                        title={text.form.edit}
                        onClick={ctrl.onEditClick}
                        visible={ctrl.getMode() === 'view'}
                        width={width}
                    />
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="save"
                        title={text.form.save}
                        enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                        onClick={ctrl.onSaveClick}
                        visible={ctrl.getMode() === 'edit'}
                        width={width}
                    />
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="cancel"
                        title={text.form.cancel}
                        visible={ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                        onClick={ctrl.onCancelClick}
                        width={width}
                    />
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="discard"
                        title={text.form.discard}
                        enabled={ctrl.state.changed || !ctrl.isValid()}
                        onClick={ctrl.onDiscardClick}
                        visible={ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        width={width}
                    />
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="refresh"
                        title={text.form.refresh}
                        enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                        onClick={ctrl.onRefreshClick}
                        visible={ctrl.getMode() === 'view'}
                        width={width}
                    />
                }
                {ctrl.model.hasActions() &&
                    <DropdownButton
                        actions={this.getActionsForDropdownButton()}
                        title={text.form.actions}
                        onClick={this.onActionsClick}
                    />
                }
            </div>
        );
    }
    static renderLabel(fieldCtrl, key) {
        const model = fieldCtrl.model;
        return (
            <div key={key} className={'RowFormView__label'}>
                {model.getCaption()}:
                {model.isNotNull() && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    static renderField(fieldCtrl, props = {}) {
        // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
        return React.createElement(fieldCtrl.getViewClass(), {
            classList: ['RowFormView__field'],
            onCreate: fieldCtrl.onViewCreate,
            ctrl: fieldCtrl,
            ...props
        });
    }
    static renderError(fieldCtrl, key) {
        // console.log('RowFormView.renderError:', fieldCtrl.state);
        return (
            <div key={key} className={'RowFormView__tooltip'}>
                <Tooltip position="left" type="alert" hidden={fieldCtrl.getErrorMessage() === null} tip={fieldCtrl.getErrorMessage()}/>
            </div>
        );
    }
    renderFields() {
        // console.log('RowFormView.renderFields');
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssBlockName()}__form-grid`}>
                {Object.keys(ctrl.fields).filter(name => ctrl.getField(name).getModel().isVisible()).map(name => {
                    const fieldCtrl = ctrl.getField(name);
                    return [
                        RowFormView.renderLabel(fieldCtrl, `label.${fieldCtrl.getModel().getName()}`),
                        RowFormView.renderField(fieldCtrl, {key: `field.${fieldCtrl.getModel().getName()}`}),
                        RowFormView.renderError(fieldCtrl, `tooltip.${fieldCtrl.getModel().getName()}`)
                    ];
                })}
            </div>
        );
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('RowFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
    render() {
        console.log('RowFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssClassNames()} flex-rows grid-gap-5`}>
                {(ctrl.model.hasDefaultSqlDataSource() || ctrl.model.hasActions()) && this.renderToolbar()}
                {this.renderFields()}
            </div>
        );
    }
}
window.QForms.RowFormView = RowFormView;
