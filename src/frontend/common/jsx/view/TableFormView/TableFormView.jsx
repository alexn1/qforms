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
                        enabled={!ctrl.parent.model.hasNew()}
                    />
                }
                {model.data.newRowMode !== 'disabled' &&
                    <Button
                        key="new"
                        width={width}
                        title={model.getApp().getText().form.new}
                        onClick={ctrl.onNewClick}
                        enabled={!ctrl.parent.model.hasNew()}
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
                {Object.keys(ctrl.model.data.actions).length > 0 &&
                    <DropdownButton
                        actions={ctrl.getActions()}
                        onClick={ctrl.onActionsClick}
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
                    <span className="count">{dataSource.getRowsLength()} {dataSource.getLimit() && `of ${dataSource.getCount()}`}</span>
                </div>
                {dataSource.getLimit() &&
                    <div className="gotoBlock">
                        <Button enabled={ctrl.canPrev()} onClick={ctrl.onPreviousClick} width="100px">{text.form.previous}</Button>
                        <ComboBox
                            value={ctrl.model.getDataSource().getFrame().toString()}
                            onChange={ctrl.onFrameChanged}
                            items={new Array(dataSource.getFramesCount()).fill().map((val, i) =>
                            ({value: (i+1).toString(), title: (i+1).toString()})
                        )}/>
                        <Button enabled={ctrl.canNext()} onClick={ctrl.onNextClick} width="100px">{text.form.next}</Button>
                    </div>
                }
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
        if (fieldCtrl.model.getClassName() === 'ComboBoxField') return <TableFormComboBoxFieldView
            row={row}
            column={column}
            onCreate={onCreate}
            onUnmount={onUnmount}
            ctrl={fieldCtrl}
        />;
        return null;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TableFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
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
                      onActiveRowChange={ctrl.onActiveRowChange}
                      getActiveRowIndex={ctrl.getActiveRowIndex}
                      renderGridCellView={this.renderGridCellView}
                      updated={ctrl.getUpdated()}
                />
                {this.renderPaging()}
            </div>
        );
    }
}
