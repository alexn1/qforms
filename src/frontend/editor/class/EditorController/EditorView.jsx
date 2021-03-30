class EditorView extends ReactComponent {
    renderDocumentView(document) {
        if (!document.controller.getDocumentViewClass()) return <div>no document view for {document.controller.constructor.name}</div>;
        return React.createElement(document.controller.getDocumentViewClass(), {
            onCreate: c => document.view = c,
            document: document,
            ctrl    : document.controller
        });
    }
    getTabs() {
        console.log('EditorView.getTabs', this.props.ctrl.documents);
        return this.props.ctrl.documents.map(document => ({
            name   : document.controller.model.getName(),
            title  : document.controller.model.getFullName(),
            content: this.renderDocumentView(document)
        }));
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="EditorView">
            <div id="sidebar">
                <div className="TreeBar flex-min">
                    {/*<div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" >
                            <span>Actions</span> <span className="caret"/>
                        </button>


                    </div>*/}
                    <a className="btn btn-large btn-primary" target="_blank" href={ctrl.runAppLink}>Run Application</a>
                    <div>
                        <ActionList onCreate={c => ctrl.actionList = c} onClick={ctrl.onActionClick}/>
                    </div>
                </div>
                <TreeWidget2
                    onCreate={c => ctrl.treeWidget2 = c}
                    items={ctrl.items}
                    onItemSelect={ctrl.onItemSelect2}
                    onItemDoubleClick={ctrl.onItemDoubleClick2}
                    onItemOpen={ctrl.onItemOpen2}
                />
                <Tab
                    classList={['Tab-blue', 'full']}
                    tabs={[
                        {
                            name   : 'properties',
                            title  : 'Properties',
                            content: <PropertyGrid2
                                onCreate={c => ctrl.pg = c}
                                onChange={ctrl.onPropertyGrid2Change}
                            />
                        }
                    ]}
                />
            </div>
            <div id="client">
                <Tab
                    classList={['full']}
                    canClose={true}
                    onTabClose={ctrl.onDocumentClose}
                    onCreate={c => ctrl.tabWidget = c}
                    tabs={this.getTabs()}
                />
            </div>
            {ctrl.modal && React.createElement(ModalView, {ctrl: ctrl.modal})}
        </div>;
    }
}
