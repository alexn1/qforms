class DatabaseView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'DatabaseView place'}>
            <div className={'client place'}>
                <div className={'frame'}>
                    <div className={'divTableInfo'}></div>
                </div>
            </div>
            <TreeWidget2
                classList={['sidebar']}
                items={[
                    {getTitle: () => 'table1'},
                    {getTitle: () => 'table2'}
                ]}
            />
        </div>;
    }
}
