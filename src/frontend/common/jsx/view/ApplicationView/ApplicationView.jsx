class ApplicationView extends ReactComponent {
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
    renderModal() {
        return this.props.ctrl.modalPages.map(pageCtrl =>
            <Modal
                key={pageCtrl.model.id}
                content={
                    <PageView
                        ctrl={pageCtrl}
                        onCreate={pageCtrl.onViewCreate}
                    />
                }
            />);
    }
    render() {
        console.log('ApplicationView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`ApplicationView ${model.data.theme}`}>
                {this.renderActivePage()}
                {this.renderModal()}
            </div>
        );
    }
}
