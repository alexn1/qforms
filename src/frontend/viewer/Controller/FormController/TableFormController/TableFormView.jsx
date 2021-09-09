class TableFormView extends FormView {
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const dataSource = model.getDefaultDataSource();
        const width = '120px';
        return (
            <div className={'TableFormView__toolbar'}>
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
                {ctrl.model.hasActions() &&
                    <DropdownButton
                        title={model.getApp().getText().form.actions}
                        actions={this.getActionsForDropdownButton()}
                        onClick={this.onActionsClick}
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
                <div className="paging__countBlock">
                    <span className="count">{dataSource.getRowsLength()} {dataSource.getLimit() && `of ${dataSource.getCount()}`}</span>
                </div>
                {dataSource.getLimit() &&
                    <div className="paging__gotoBlock">
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
        if (!ctrl) throw new Error(`no field: ${column.name}`);
        // console.log(column.name, ctrl.constructor.name);
        return React.createElement(ctrl.getViewClass(), {row, column, onCreate, onUnmount, ctrl});
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('TableFormView.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        return false;
    }
    getGridColumns() {
        const ctrl = this.props.ctrl;
        return Object.keys(ctrl.fields).filter(name => ctrl.fields[name].model.isVisible()).map(name => {
            const field = ctrl.fields[name];
            return {
                name : field.model.getName(),
                title: field.model.getCaption(),
                width: field.model.getWidth()
            };
        });
    }
    getRows() {
        const ctrl = this.props.ctrl;
        return ctrl.model.getDefaultDataSource().getRows();
    }
    render() {
        console.log('TableFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return (
            <div className={`${this.getClassName()} full flex-rows`}>
                {this.renderToolbar()}
                <Grid
                    classList={['flex-max']}
                    onCreate={ctrl.onGridCreate}
                    name={ctrl.model.getFullName()}
                    columns={this.getGridColumns()}
                    rows={this.getRows()}
                    getRowKey={row => ctrl.model.getDefaultDataSource().getRowKey(row)}
                    onDoubleClick={ctrl.onGridCellDblClick}
                    onDeleteClick={ctrl.onGridDeleteClick}
                    onSelectionChange={ctrl.onSelectionChange}
                    renderGridCellView={this.renderGridCellView}
                    updated={ctrl.getUpdated()}
                />
                {ctrl.getModel().hasDefaultSqlDataSource() && this.renderPaging()}
            </div>
        );
    }
}
window.QForms.TableFormView = TableFormView;
