class TableFormView extends ReactComponent {
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const dataSource = model.getDefaultDataSource();
        const width = '90px';
        return (
            <div className="toolbar">
                {model.data.refreshButton === 'true' && dataSource.constructor.name === 'SqlDataSource' &&
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
                {ctrl.model.data.actions.length > 0 &&
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
        const dataSource = model.getDefaultDataSource();
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
                            value={ctrl.model.getDefaultDataSource().getFrame().toString()}
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
        const ctrl = this.props.ctrl.fields[column.name];
        // console.log(column.name, ctrl.constructor.name);
        /*if ([
            'TextBoxField',
            'DatePickerField',
            'ComboBoxField',
            'CheckBoxField',
            'LinkField',
            'TimeField',
        ].includes(ctrl.model.getClassName())) {
            return React.createElement(ctrl.getViewClass(), {row, column, onCreate, onUnmount, ctrl});
        }
        return null;*/
        return React.createElement(ctrl.getViewClass(), {row, column, onCreate, onUnmount, ctrl});
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TableFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
    render() {
        console.log('TableFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const dataSource = ctrl.model.getDefaultDataSource();
        return (
            <div className="TableFormView full flex-rows">
                {this.renderToolbar()}
                <Grid
                    classList={['flex-max']}
                    name={ctrl.model.getFullName()}
                    columns={ctrl.getGridColumns()}
                    rows={ctrl.getRows()}
                    getRowKey={row => ctrl.model.getDefaultDataSource().getRowKey(row)}
                    onDoubleClick={ctrl.onGridCellDblClick}
                    onActiveRowChange={ctrl.onActiveRowChange}
                    getActiveRowIndex={ctrl.getActiveRowIndex}
                    renderGridCellView={this.renderGridCellView}
                    updated={ctrl.getUpdated()}
                />
                {dataSource.constructor.name === 'SqlDataSource' && this.renderPaging()}
            </div>
        );
    }
}
