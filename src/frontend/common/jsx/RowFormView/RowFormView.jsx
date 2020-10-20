class RowFormView extends ReactComponent {
    renderToolbar() {
        // console.log('Toolbar.renderToolbar');
        const ctrl = this.props.ctrl;
        const width = '90px';
        return (
            <div className="toolbar">
                {ctrl.model.getDataSource().getClassName() === 'SqlDataSource' &&
                [
                    <Button
                        key="edit"
                        title="Edit"
                        onClick={ctrl.onEditClick}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />,
                    <Button
                        key="save"
                        title="Save"
                        enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                        onClick={ctrl.onSaveClick.bind(ctrl)}
                        visible={ctrl.state.mode === 'edit'}
                        width={width}
                    />,
                    <Button
                        key="cancel"
                        title="Cancel"
                        visible={ctrl.state.mode === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                        onClick={ctrl.onCancelClick}
                        width={width}
                    />,
                    <Button
                        key="discard"
                        title="Discard"
                        enabled={ctrl.state.changed || !ctrl.isValid()}
                        onClick={ctrl.onDiscardClick.bind(ctrl)}
                        visible={ctrl.state.mode === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        width={width}
                    />,
                    <Button
                        key="refresh"
                        title="Refresh"
                        enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                        onClick={ctrl.onRefresh.bind(ctrl)}
                        visible={ctrl.state.mode === 'view'}
                        width={width}
                    />
                ]
                }
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
        const model = ctrl.model;
        if (model.getClassName() === 'DatePickerField') {
            return <RowFormDatePickerFieldView key={`field.${ctrl.model.getName()}`} ctrl={ctrl}/>;
        }
        if (model.getClassName() === 'ComboBoxField') {
            return <RowFormComboBoxFieldView key={`field.${ctrl.model.getName()}`} ctrl={ctrl}/>;
        }
        return <RowFormTextBoxFieldView key={`field.${ctrl.model.getName()}`} ctrl={ctrl}/>;
    }
    renderFieldTooltip(ctrl) {
        // console.log('renderFieldTooltip:', ctrl.state);
        return (
            <div key={`tooltip.${ctrl.model.getName()}`} className={`tooltip ${ctrl.model.getName()}`}>
                <Tooltip position="left" type="alert" hidden={ctrl.state.error === null} tip={ctrl.state.error}/>
            </div>
        );
    }
    renderFormGrid() {
        // console.log('RowFormView.renderFormGrid');
        const ctrl = this.props.ctrl;
        return (
            <div className="grid">
                {Object.keys(ctrl.fields).map(name => {
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
    render() {
        console.log('RowFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`RowFormView ${model.getName()}`}>
                {this.renderToolbar()}
                {this.renderFormGrid()}
            </div>
        );
    }
}
