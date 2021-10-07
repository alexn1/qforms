class ApplicationView extends View {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            return this.renderPage(ctrl.activePage);
        }
    }
    renderPage(pageCtrl, props = {}) {
        return React.createElement(pageCtrl.getViewClass(), {
            parent  : this,
            ctrl    : pageCtrl,
            onCreate: pageCtrl.onViewCreate,
            ...props
        });
    }
    renderModalPages() {
        return this.props.ctrl.modalPages.map(pageCtrl =>
            <Modal key={pageCtrl.getModel().getId()}>
                {this.renderPage(pageCtrl)}
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
