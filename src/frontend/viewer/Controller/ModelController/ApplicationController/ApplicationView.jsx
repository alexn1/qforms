class ApplicationView extends ModelView {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            return this.renderView(ctrl.activePage);
        }
    }
    renderView(ctrl, props = {}) {
        return React.createElement(ctrl.getViewClass(), {
            parent  : this,
            ctrl    : ctrl,
            onCreate: ctrl.onViewCreate,
            ...props
        });
    }
    renderModalPages() {
        return this.props.ctrl.modals.map(ctrl =>
            <Modal key={ctrl.getId()}>
                {this.renderView(ctrl)}
            </Modal>
        );
    }
    render() {
        console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getCssBlockName()}__container`}>
                <header>
                    <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                </header>
                <main className={`${this.getCssBlockName()}__main`}>
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

window.QForms.ApplicationView = ApplicationView;
