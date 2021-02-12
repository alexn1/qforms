class DatabaseView extends ReactComponent {
    renderGrid() {
        // console.log('DatabaseView.renderGrid');
        const ctrl = this.props.ctrl;
        return <Grid
            columns={[
                {name: 'name', title: 'name', width: 100},
                {name: 'type', title: 'type', width: 60},
                {name: 'key', title: 'key', width: 60},
                {name: 'auto', title: 'auto', width: 60},
                {name: 'nullable', title: 'nullable', width: 60},
                {name: 'dbType', title: 'dbType', width: 200},
                {name: 'comment', title: 'comment', width: 100},
            ]}
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
                    <div className={'divTableInfo full flex-rows'}>
                        {ctrl.tableInfo && this.renderGrid()}
                        {ctrl.tableInfo && <Button onClick={ctrl.onCreateTableClick}>Create Table</Button>}
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
