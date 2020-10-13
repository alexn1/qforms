class Toolbar3 extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = '150px';
        return (
            <div className="Toolbar3">
                {model.hasRowFormWithDefaultDsAndTable() &&
                <Button
                    key="saveAndClose"
                    width={width}
                    title={model.getApp().getText().page.saveAndClose}
                    onClick={ctrl.onSaveAndCloseClick}
                />
                }
                <Button
                    key="close"
                    width={width}
                    title={model.getApp().getText().page.close}
                    onClick={ctrl.onClosePageClick}
                />
            </div>
        );
    }
}
