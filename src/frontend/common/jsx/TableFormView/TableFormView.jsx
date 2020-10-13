class TableFormView extends ReactComponent {
    render() {
        console.log('TableFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`TableFormView full flex-rows ${model.getName()}`}>
                <Toolbar2 ctrl={ctrl}/>
                <Grid columns={ctrl.getGridColumns()}
                      rows={ctrl.getGridRows()}
                      getRowKey={row => ctrl.model.getDataSource().getRowKey(row)}
                      onDoubleClick={ctrl.onGridCellDblClick}
                />
                <Paging ctrl={ctrl}/>
            </div>
        );
    }
}
