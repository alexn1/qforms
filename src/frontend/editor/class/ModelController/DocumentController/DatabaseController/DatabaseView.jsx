class DatabaseView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const document = this.props.document;
        return <div className={'DatabaseView place'}>
            <div className={'client place'}>
                <div className={'frame'}>
                    <div className={'divTableInfo'}></div>
                </div>
            </div>
            <TreeWidget2
                classList={['sidebar']}
                items={document.tables.map(tableName => ({getTitle: () => tableName}))}
            />
        </div>;
    }
}
