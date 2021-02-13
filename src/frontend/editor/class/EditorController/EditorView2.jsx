class EditorView2 extends ReactComponent {
    renderTab(document) {
        if (!document.controller.getDocumentViewClass()) return <div>no document view for {document.controller.constructor.name}</div>;
        return React.createElement(document.controller.getDocumentViewClass(), {
            onCreate: c => document.controller.documentView = c,
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
