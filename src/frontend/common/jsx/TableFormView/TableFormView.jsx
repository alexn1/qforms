class TableFormView extends ReactComponent {
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const width = '90px';
        return (
            <div className="toolbar">
                {model.data.refreshButton === 'true' &&
                    <Button
                        key="refresh"
                        width={width}
                        title={model.getApp().getText().form.refresh}
                        onClick={ctrl.onRefreshClick}
                    />
                }
                {model.data.newRowMode !== 'disabled' &&
                    <Button
                        key="new"
                        width={width}
                        title={model.getApp().getText().form.new}
                        onClick={ctrl.onNewClick}
                    />
                }
                {model.data.deleteRowMode !== 'disabled' &&
                    <Button
                        key="delete"
                        width={width}
                        title={model.getApp().getText().form.delete}
                        onClick={ctrl.onDeleteClick}
                        enabled={ctrl.isRowSelected()}
                    />
                }
            </div>
        );
    }
    renderPaging() {
        const ctrl = this.props.ctrl;
        const model = this.props.ctrl.model;
        const dataSource = model.getDataSource();
        const text = model.getApp().getText();
        return (
            <div className="paging">
                <div className="countBlock">
                    {/*<span>{text.form.count}: </span>*/}
                    <span className="count">{dataSource.getFrameLength()} of {dataSource.getCount()}</span>
                </div>
                <div className="gotoBlock">
                    <button className="previous" onClick={ctrl.onPreviousClick}>{text.form.previous}</button>
                    <select className="goto" style={{border: 'none'}}>
                        {new Array(dataSource.getFramesCount()).fill().map((val, i) =>
                            <option key={i+1} value={i + 1}>{i + 1}</option>
                        )}
                    </select>
                    <button className="next" onClick={ctrl.onNextClick}>{text.form.next}</button>
                </div>
            </div>
        );
    }
    renderGridCellView = (row, column, onCreate, onUnmount) => {
        // console.log('TableFormView.renderGridCellView');
        const ctrl = this.props.ctrl;
        const fieldCtrl = ctrl.fields[column.name];
        // console.log(column.name, fieldCtrl.constructor.name);
        if (fieldCtrl.model.getClassName() === 'TextBoxField') return <TableFormTextBoxFieldView
            row={row}
            column={column}
            onCreate={onCreate}
            onUnmount={onUnmount}
            ctrl={fieldCtrl}
        />;
        if (fieldCtrl.model.getClassName() === 'DatePickerField') return <TableFormDatePickerFieldView
            row={row}
            column={column}
            onCreate={onCreate}
            onUnmount={onUnmount}
            ctrl={fieldCtrl}
        />;
        return null;
    }
    render() {
        console.log('TableFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormView full flex-rows">
                {this.renderToolbar()}
                <Grid
                      name={ctrl.model.getFullName()}
                      columns={ctrl.getGridColumns()}
                      rows={ctrl.getGridRows()}
                      getRowKey={row => ctrl.model.getDataSource().getRowKey(row)}
                      onDoubleClick={ctrl.onGridCellDblClick}
                      onActiveRowChanged={ctrl.onActiveRowChanged}
                      getActiveRow={ctrl.getActiveRow}
                      renderGridCellView={this.renderGridCellView}
                      updated={ctrl.getUpdated()}
                />
                {this.renderPaging()}
            </div>
        );
    }
}
