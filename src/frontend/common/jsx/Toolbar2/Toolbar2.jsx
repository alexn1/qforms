class Toolbar2 extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = '90px';
        return (
            <div className="Toolbar2">
                <Button
                    key="refresh"
                    width={width}
                    title={model.getApp().getText().form.refresh}
                    // onClick={ctrl.onRefreshClick}
                />
            </div>
        );
    }
}
