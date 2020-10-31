class SdiApplicationView extends ApplicationView {
    render() {
        console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`SdiApplicationView ${model.data.theme}`}>
                <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                <div className="sdi">
                    {this.renderActivePage()}
                </div>
                <Statusbar onCreate={ctrl.onStatusbarCreate}/>
                {this.renderModal()}
            </div>
        );
    }
}
