class EditorView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <div style={{height: '100%'}}>
            <div className="TreeBar flex-min">
                <div id="treeActions" className="dropdown">
                    <a className="btn btn-large btn-primary" target="_blank" href={ctrl.runAppLink}
                       style={{float: "right"}}>Run Application</a>
                    <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                        <span>Actions</span> <span className="caret"></span>
                    </button>
                    <ul id="treeActionsList" className="dropdown-menu">
                        <li className="disabled"><a>none</a></li>
                    </ul>
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
        </div>;
    }
}
