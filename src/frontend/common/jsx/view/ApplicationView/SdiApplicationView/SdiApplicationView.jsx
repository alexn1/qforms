class SdiApplicationView extends ApplicationView {
    render() {
        console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
                <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                <div></div>
                <Statusbar onCreate={ctrl.onStatusbarCreate}/>
                {this.renderModal()}
            </div>
        );
    }
}
