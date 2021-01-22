class EditorView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <Tab
            classList={['Tab-blue', 'full']}
            tabs={[
                {
                    name   : 'properties',
                    title  : 'Properties',
                    content: <div>
                        <PropertyGrid2 onCreate={c => ctrl.pg = c} onChange={ctrl.onPropertyGrid2Change}/>
                        <TreeWidget2 items={ctrl.getTreeItems()}/>
                    </div>
                }
            ]}
        />
    }
}
