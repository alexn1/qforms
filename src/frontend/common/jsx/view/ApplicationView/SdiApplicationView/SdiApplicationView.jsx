class SdiApplicationView extends ApplicationView {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            const pageCtrl = ctrl.activePage;
            return React.createElement(pageCtrl.getViewClass(), {
                ctrl    : pageCtrl,
                onCreate: pageCtrl.onViewCreate
            })
        }
    }
    render() {
        console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
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
