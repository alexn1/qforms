class DatabaseView extends ReactComponent {
    renderGrid() {
        // console.log('DatabaseView.renderGrid');
        const ctrl = this.props.ctrl;
        return <Grid
            columns={Object.keys(ctrl.tableInfo[0]).map(name => ({name: name, title: name, width: 100}))}
            rows={ctrl.tableInfo}
            getRowKey={row => row.name}
            updated={Date.now()}
        />;
    }
    render() {
        // console.log('DatabaseView.render');
        const ctrl = this.props.ctrl;
        const document = this.props.document;
        return <div className={'DatabaseView place'}>
            <div className={'client place'}>
                <div className={'frame'}>
                    <div className={'divTableInfo'}>
                        {ctrl.tableInfo && this.renderGrid()}
                    </div>
                </div>
            </div>
            <TreeWidget2
                classList={['sidebar']}
                items={document.treeWidgetItems}
                onItemSelect={ctrl.onTableSelect2}
            />
        </div>;
    }
}
