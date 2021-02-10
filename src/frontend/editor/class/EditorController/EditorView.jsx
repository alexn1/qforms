class EditorView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <div style={{height: '100%'}}>
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
