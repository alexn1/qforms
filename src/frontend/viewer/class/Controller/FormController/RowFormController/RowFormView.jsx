class RowFormView extends FormView {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const ctrl = this.props.ctrl;
        const width = '90px';
        return (
            <div className="toolbar">
                {ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        key="edit"
                        title="Edit"
                        onClick={ctrl.onEditClick}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />
                }
                {ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        key="save"
                        title="Save"
                        enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                        onClick={ctrl.onSaveClick}
                        visible={ctrl.state.mode === 'edit'}
                        width={width}
                    />
                }
                {ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        key="cancel"
                        title="Finish"
                        visible={ctrl.state.mode === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                        onClick={ctrl.onCancelClick}
                        width={width}
                    />
                }
                {ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        key="discard"
                        title="Discard"
                        enabled={ctrl.state.changed || !ctrl.isValid()}
                        onClick={ctrl.onDiscardClick}
                        visible={ctrl.state.mode === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        width={width}
                    />
                }
                {ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' &&
                    <Button
                        key="refresh"
                        title="Refresh"
                        enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                        onClick={ctrl.onRefreshClick}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />
                }
                {ctrl.model.hasActions() &&
                    <DropdownButton actions={this.getActions()} onClick={this.onActionsClick}/>
                }
            </div>
        );
    }
    static renderLabel(fieldCtrl, key) {
        const model = fieldCtrl.model;
        return (
            <div key={key} className="label">
                {model.getCaption()}:
                {model.isNotNull() && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    static renderField(fieldCtrl, props = {}) {
        // console.log('RowFormView.renderField', fieldCtrl.model.getClassName());
        return React.createElement(fieldCtrl.getViewClass(), {
            classList: ['field'],
            ctrl: fieldCtrl,
            ...props
        });
    }
    static renderError(fieldCtrl, key) {
        // console.log('RowFormView.renderError:', fieldCtrl.state);
        return (
            <div key={key} className="tooltip">
                <Tooltip position="left" type="alert" hidden={fieldCtrl.getErrorMessage() === null} tip={fieldCtrl.getErrorMessage()}/>
            </div>
        );
    }
    renderFields() {
        // console.log('RowFormView.renderFields');
        const ctrl = this.props.ctrl;
        return (
            <div className="formGrid">
                {Object.keys(ctrl.fields).filter(name => ctrl.fields[name].model.isVisible()).map(name => {
                    const fieldCtrl = ctrl.fields[name];
                    return [
                        RowFormView.renderLabel(fieldCtrl, `label.${fieldCtrl.model.getName()}`),
                        RowFormView.renderField(fieldCtrl, {key: `field.${fieldCtrl.model.getName()}`}),
                        RowFormView.renderError(fieldCtrl, `tooltip.${fieldCtrl.model.getName()}`)
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
            <div className="RowFormView">
                {(ctrl.model.getDefaultDataSource().getClassName() === 'SqlDataSource' || ctrl.model.hasActions()) && this.renderToolbar()}
                {this.renderFields()}
            </div>
        );
    }
}
