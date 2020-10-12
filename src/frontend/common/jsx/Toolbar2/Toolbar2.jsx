class Toolbar2 extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = '90px';
        return (
            <div className="Toolbar2">
                {model.data.refreshButton === 'true' &&
                    <Button
                        key="refresh"
                        width={width}
                        title={model.getApp().getText().form.refresh}
                        onClick={ctrl.onRefreshClick}
                    />
                }
                {model.data.newRowMode !== 'disabled' &&
                    <Button
                        key="new"
                        width={width}
                        title={model.getApp().getText().form.new}
                        onClick={ctrl.onNewClick}
                    />
                }
                {model.data.deleteRowMode !== 'disabled' &&
                <Button
                    key="delete"
                    width={width}
                    title={model.getApp().getText().form.delete}
                    onClick={ctrl.onDeleteClick}
                />
                }
            </div>
        );
    }
}
