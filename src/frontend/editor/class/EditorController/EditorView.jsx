class EditorView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <Tab
            classList={['Tab-blue', 'full']}
            tabs={[
                {
                    name   : 'properties',
                    title  : 'Properties',
                    content: <div style={{height: '100%'}}>
                        <TreeWidget2 items={ctrl.getTreeItems()}/>
                        <PropertyGrid2 onCreate={c => ctrl.pg = c} onChange={ctrl.onPropertyGrid2Change}/>
                    </div>
                }
            ]}
        />
    }
}
