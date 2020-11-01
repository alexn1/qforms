class ApplicationView extends ReactComponent {
    renderActivePage() {
        const ctrl = this.props.ctrl;
        if (ctrl.activePage) {
            return this.renderPage(ctrl.activePage);
        }
    }
    renderPage(pageCtrl) {
        return React.createElement(pageCtrl.getViewClass(), {
            ctrl    : pageCtrl,
            onCreate: pageCtrl.onViewCreate
        });
    }
    renderModalPages() {
        return this.props.ctrl.modalPages.map(pageCtrl =>
            <Modal key={pageCtrl.model.id}>
                {this.renderPage(pageCtrl)}
            </Modal>
        );
    }
    render() {
        console.log('ApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
                {this.renderActivePage()}
                {this.renderModalPages()}
            </div>
        );
    }
}
