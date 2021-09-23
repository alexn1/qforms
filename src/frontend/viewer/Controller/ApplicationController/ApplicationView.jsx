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

}

window.QForms.ApplicationView = ApplicationView;
