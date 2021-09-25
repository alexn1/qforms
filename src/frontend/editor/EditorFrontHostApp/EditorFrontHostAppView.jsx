class EditorFrontHostAppView extends ReactComponent {
    renderDocumentView(document) {
        if (!document.controller.getDocumentViewClass()) return <div>no document view for {document.controller.constructor.name}</div>;
        return React.createElement(document.controller.getDocumentViewClass(), {
            onCreate: c => document.view = c,
            document: document,
            ctrl    : document.controller
        });
    }
    getTabs() {
        console.log('EditorFrontHostAppView.getTabs', this.props.ctrl.documents);
        return this.props.ctrl.documents.map(document => ({
            name   : document.controller.model.getFullName(),
            title  : document.controller.model.getFullName(),
            content: this.renderDocumentView(document)
        }));
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="EditorFrontHostAppView">
            <div className={'EditorFrontHostAppView__sidebar'}>
                <div className="TreeBar">
                    {/*<div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" >
                            <span>Actions</span> <span className="caret"/>
                        </button>
                    </div>*/}
                    <a href={ctrl.runAppLink} target="_blank">Run Application</a>
                    <div>
                        <ActionList onCreate={c => ctrl.actionList = c} onClick={ctrl.onActionClick}/>
                    </div>
                </div>
                <TreeWidget
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
                            content: <PropertyGrid
                                onCreate={c => ctrl.pg = c}
                                onChange={ctrl.onPropertyGrid2Change}
                            />
                        }
                    ]}
                />
            </div>
            <div className={'EditorFrontHostAppView__client'}>
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
