class RowFormView extends ReactComponent {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const ctrl = this.props.ctrl;
        const width = '90px';
        return (
            <div className="toolbar">
                <Button
                    key="edit"
                    title="Edit"
                    onClick={ctrl.onEditClick}
                    visible={ctrl.state.mode === 'view'}
                    width={width}
                />
                <Button
                    key="save"
                    title="Save"
                    enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                    onClick={ctrl.onSaveClick}
                    visible={ctrl.state.mode === 'edit'}
                    width={width}
                />
                <Button
                    key="cancel"
                    title="Finish"
                    visible={ctrl.state.mode === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                    onClick={ctrl.onCancelClick}
                    width={width}
                />
                <Button
                    key="discard"
                    title="Discard"
                    enabled={ctrl.state.changed || !ctrl.isValid()}
                    onClick={ctrl.onDiscardClick}
                    visible={ctrl.state.mode === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                    width={width}
                />
                <Button
                    key="refresh"
                    title="Refresh"
                    enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                    onClick={ctrl.onRefreshClick}
                    visible={ctrl.state.mode === 'view'}
                    width={width}
                />
                {Object.keys(ctrl.model.data.actions).length > 0 &&
                    <DropdownButton actions={ctrl.getActions()} onClick={ctrl.onActionsClick}/>
                }
            </div>
        );
    }
    renderFieldLabel(ctrl) {
        const model = ctrl.model;
        return (
            <div key={`label.${model.getName()}`} className={`label ${model.getName()}`}>
                {model.data.caption}:
                {model.isNotNull() && <span style={{color: 'red'}}>*</span>}
            </div>
        );
    }
    renderFieldView(ctrl) {
        // console.log('RowFormView.renderFieldView', ctrl.model.getClassName());
        if ([
            'DatePickerField',
            'ComboBoxField',
            'TextAreaField',
            'CheckBoxField',
            'LinkField',
            'ImageField',
            'FileField',
        ].includes(ctrl.model.getClassName())) {
            return React.createElement(ctrl.getViewClass(), {
                key : `field.${ctrl.model.getName()}`,
                ctrl: ctrl,
                classList: ['field']
            });
        }
        return <RowFormTextBoxFieldView
            key={`field.${ctrl.model.getName()}`}
            ctrl={ctrl}
            classList={['field']}
        />;
    }
    renderFieldTooltip(ctrl) {
        // console.log('RowFormView.renderToolbar:', ctrl.state);
        return (
            <div key={`tooltip.${ctrl.model.getName()}`} className={`tooltip ${ctrl.model.getName()}`}>
                <Tooltip position="left" type="alert" hidden={ctrl.state.error === null} tip={ctrl.state.error}/>
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
                        this.renderFieldLabel(fieldCtrl),
                        this.renderFieldView(fieldCtrl),
                        this.renderFieldTooltip(fieldCtrl)
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
                {ctrl.model.getDataSource().getClassName() === 'SqlDataSource' && this.renderToolbar()}
                {this.renderFields()}
            </div>
        );
    }
}
