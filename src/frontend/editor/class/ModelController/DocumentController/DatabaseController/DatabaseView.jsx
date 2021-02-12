class DatabaseView extends ReactComponent {
    renderGrid() {
        const ctrl = this.props.ctrl;
        return <Grid
            columns={Object.keys(ctrl.tableInfo[0]).map(name => ({name: name, title: name, width: 100}))}
        />;
    }
    render() {
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
                items={document.tables.map(tableName => ({getTitle: () => tableName}))}
                onItemSelect={ctrl.onTableSelect2}
            />
        </div>;
    }
}
