class EditorView2 extends ReactComponent {
    renderTab(document) {
        if (!document.controller.getDocumentView()) return null;
        return React.createElement(document.controller.getDocumentView(), {
            document: document,
            ctrl    : document.controller
        });
    }
    getTabs() {
        return this.props.ctrl.documents.map(document => ({
            name   : document.controller.model.getName(),
            title  : document.controller.model.getName(),
            content: this.renderTab(document)
        }));
    }
    render() {
        const ctrl = this.props.ctrl;
        return <Tab
            classList={['full']}
            canClose={true}
            onTabClose={ctrl.onDocumentClose}
            onCreate={c => ctrl.tabWidget = c}
            tabs={this.getTabs()}
        />;
    }
}
