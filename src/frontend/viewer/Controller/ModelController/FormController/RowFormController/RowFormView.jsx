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
                        onClick={this.onActionsClick}
                    ><MoreVertIcon/></DropdownButton>
                }
            </div>
        );
    }
    renderLabel(fieldCtrl, key) {
        const model = fieldCtrl.model;
        return <div key={key} className={`${this.getCssBlockName()}__label`}>
            {model.getCaption()}:
            {model.isNotNull() && <span style={{color: 'red'}}>*</span>}
        </div>;
    }
    renderField(fieldCtrl, key) {
        // console.log('RowFormView.renderField2', fieldCtrl.model.getClassName());
        return <div key={key} className={`${this.getCssBlockName()}__field`}>
            {React.createElement(fieldCtrl.getViewClass(), {
                onCreate: fieldCtrl.onViewCreate,
                ctrl: fieldCtrl,
            })}
        </div>;
    }
    renderError(fieldCtrl, key) {
        // console.log('RowFormView.renderError:', fieldCtrl.state);
        return <div key={key} className={`${this.getCssBlockName()}__error`}>
            <Tooltip position="left" type="alert" hidden={fieldCtrl.getErrorMessage() === null} tip={fieldCtrl.getErrorMessage()}/>
        </div>;
    }
    renderItem(fieldCtrl) {
        const name = fieldCtrl.getModel().getName();
        return [
            this.renderLabel(fieldCtrl, `label.${name}`),
            this.renderField(fieldCtrl, `field.${name}`),
            this.renderError(fieldCtrl, `tooltip.${name}`)
        ];
    }
    renderFields() {
        // console.log('RowFormView.renderFields');
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssBlockName()}__grid`}>
            {Object.keys(ctrl.fields)
                .filter(name => ctrl.getField(name).getModel().isVisible())
                .map(name => {
                return this.renderItem(ctrl.getField(name));
            })}
        </div>;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('RowFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
    render() {
        console.log('RowFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} flex-rows grid-gap-5`}>
            {(ctrl.model.hasDefaultSqlDataSource() || ctrl.model.hasActions()) && this.renderToolbar()}
            {this.renderFields()}
        </div>;
    }
}

window.QForms.RowFormView = RowFormView;
