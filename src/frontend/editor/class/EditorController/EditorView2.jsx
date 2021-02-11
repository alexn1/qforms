class EditorView2 extends ReactComponent {
    onTabClose = i => {
        console.log('EditorView2.onTabClose', i);
    }
    renderTab(document) {
        return <div>
            {document.controller.model.getName()}
        </div>;
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
