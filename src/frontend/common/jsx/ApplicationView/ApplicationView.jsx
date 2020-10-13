class ApplicationView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
                <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                <div></div>
                <Statusbar/>
            </div>
        );
    }
}
