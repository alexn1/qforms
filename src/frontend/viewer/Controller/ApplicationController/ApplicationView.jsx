class ApplicationView extends ReactComponent {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            return ApplicationView.renderPage(ctrl.activePage);
        }
    }
    static renderPage(pageCtrl, props = {}) {
        return React.createElement(pageCtrl.getViewClass(), {
            ctrl     : pageCtrl,
            onCreate : pageCtrl.onViewCreate,
            ...props
        });
    }
    renderModalPages() {
        return this.props.ctrl.modalPages.map(pageCtrl =>
            <Modal key={pageCtrl.model.getId()}>
                {ApplicationView.renderPage(pageCtrl)}
            </Modal>
        );
    }
    render() {
        console.log(`${this.constructor.name}.render`, this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.constructor.name}__container`}>
                <header>
                    <Menu items={ctrl.getMenuItemsProp()} onClick={ctrl.onMenuItemClick}/>
                </header>
                <main className={`${this.constructor.name}__main`}>
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
