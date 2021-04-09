class SdiApplicationView extends ApplicationView {
    render() {
        console.log('SdiApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`SdiApplicationView ${model.getAttr('theme')}`}>
                <header>
                    <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                </header>
                <main className="sdi">
                    {this.renderActivePage()}
                </main>
                <footer>
                    <Statusbar onCreate={ctrl.onStatusbarCreate}/>
                </footer>
                {this.renderModalPages()}
            </div>
        );
    }
}
