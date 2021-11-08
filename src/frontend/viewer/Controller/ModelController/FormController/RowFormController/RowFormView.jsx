class RowFormView extends FormView {
    renderToolbar() {
        // console.log('RowFormView.renderToolbar');
        const ctrl = this.props.ctrl;
        const text = ctrl.getModel().getApp().getText();
        const width = '120px';
        return (
            <div className={`${this.getCssBlockName()}__toolbar flex grid-gap-5`}>
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="edit"
                        classList={['toolbar-button']}
                        onClick={ctrl.onEditClick}
                        visible={ctrl.getMode() === 'view'}
                        minWidth={width}
                    >
                        <EditIcon/>
                        <div>{text.form.edit}</div>
                    </Button>
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="save"
                        classList={['toolbar-button']}
                        enabled={(ctrl.state.changed || ctrl.state.hasNew) && ctrl.state.valid}
                        onClick={ctrl.onSaveClick}
                        visible={ctrl.getMode() === 'edit'}
                        minWidth={width}
                    >
                        <SaveIcon/>
                        <div>{text.form.save}</div>
                    </Button>
                }
                {ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() &&
                    <Button
                        key="cancel"
                        classList={['toolbar-button']}
                        visible={ctrl.getMode() === 'edit' && !ctrl.state.changed && ctrl.state.valid}
                        onClick={ctrl.onCancelClick}
                        minWidth={width}
                    >
                        <CancelIcon/>
                        <div>{text.form.cancel}</div>
                    </Button>
                }
                {ctrl.model.hasDefaultSqlDataSource() && ctrl.model.getKey() &&
                    <Button
                        key="discard"
                        classList={['toolbar-button']}
                        enabled={ctrl.state.changed || !ctrl.isValid()}
                        onClick={ctrl.onDiscardClick}
                        visible={ctrl.getMode() === 'edit' && (ctrl.state.changed || !ctrl.state.valid)}
                        minWidth={width}
                    >
                        <CloseIcon2/>
                        <div>{text.form.discard}</div>
                    </Button>
                }
                {ctrl.model.hasDefaultSqlDataSource() &&
                    <Button
                        key="refresh"
                        classList={['toolbar-button']}
                        enabled={!ctrl.state.changed && !ctrl.state.hasNew}
                        onClick={ctrl.onRefreshClick}
                        visible={ctrl.getMode() === 'view'}
                        minWidth={width}
                    >
                        <RefreshIcon/>
                        <div>{text.form.refresh}</div>
                    </Button>
                }
                {ctrl.model.hasActions() && ctrl.model.getKey() &&
                    <DropdownButton
                        classList={['toolbar-dropdown-button']}
                        actions={this.getActionsForDropdownButton()}
                        onClick={this.onActionsClick}
                    >
                        <MoreVertIcon/>
                    </DropdownButton>
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
