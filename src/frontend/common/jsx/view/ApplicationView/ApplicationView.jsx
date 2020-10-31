class ApplicationView extends ReactComponent {

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
        return (
            <div className="ApplicationView">ApplicationView</div>
        );
    }

}
