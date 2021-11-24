class TableFormView extends FormView {
    renderToolbar() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        const dataSource = model.getDefaultDataSource();
        return (
            <div className={`${this.getCssBlockName()}__toolbar flex grid-gap-5`}>
                {model.data.newRowMode !== 'disabled' &&
                    <Button
                        key="new"
                        classList={['toolbar-button', 'default']}
                        onClick={ctrl.onNewClick}
                        enabled={!ctrl.parent.model.hasNew()}
                    >
                        <AddIcon/>
                        <div>{model.getApp().getText().form.new}</div>
                    </Button>
                }
                {model.data.deleteRowMode !== 'disabled' &&
                    <Button
                        key="delete"
                        classList={['toolbar-button']}
                        onClick={ctrl.onDeleteClick}
                        enabled={ctrl.isRowSelected()}
                    >
                        <DeleteIcon/>
                        <div>{model.getApp().getText().form.delete}</div>
                    </Button>
                }
                {model.data.refreshButton === 'true' && dataSource.constructor.name === 'SqlDataSource' &&
                    <Button
                        key="refresh"
                        classList={['toolbar-button']}
                        onClick={ctrl.onRefreshClick}
                        enabled={!ctrl.parent.model.hasNew()}
                    >
                        <RefreshIcon/>
                        <div>{model.getApp().getText().form.refresh}</div>
                    </Button>
                }
                {ctrl.model.hasActions() &&
                    <DropdownButton
                        classList={['toolbar-dropdown-button']}
                        actions={this.getActionsForDropdownButton()}
                        onClick={this.onActionsClick}
                    >
                        <MoreVertIcon/>
                    </DropdownButton>
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
                        <Button enabled={ctrl.canPrev()} onClick={ctrl.onPreviousClick}>
                            <LeftIcon/>
                        </Button>
                        <ComboBox
                            value={ctrl.model.getDefaultDataSource().getFrame().toString()}
                            onChange={ctrl.onFrameChanged}
                            items={new Array(dataSource.getFramesCount()).fill().map((val, i) =>
                            ({value: (i+1).toString(), title: (i+1).toString()})
                        )}/>
                        <Button enabled={ctrl.canNext()} onClick={ctrl.onNextClick}>
                            <RightIcon/>
                        </Button>
                    </div>
                }
            </div>
        );
    }
    renderGridCellView = (row, column, onCreate, onUnmount) => {
        // console.log('TableFormView.renderGridCellView');
        const ctrl = this.props.ctrl.getField(column.name);
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
        return Object.keys(ctrl.fields).filter(name => ctrl.getField(name).getModel().isVisible()).map(name => {
            const field = ctrl.getField(name);
            return {
                name : field.getModel().getName(),
                title: field.getModel().getCaption(),
                width: field.getModel().getWidth()
            };
        });
    }
    getRows() {
        const ctrl = this.props.ctrl;
        return ctrl.model.getDefaultDataSource().getRows();
    }
    getGridExtraColumn() {
        return true;
    }
    getGridClass() {
        return Grid;
    }
    renderGrid() {
        const ctrl = this.props.ctrl;
        return React.createElement(this.getGridClass(), {
            classList         : ['flex-max'],
            onCreate          : ctrl.onGridCreate,
            name              : ctrl.model.getFullName(),
            columns           : this.getGridColumns(),
            rows              : this.getRows(),
            getRowKey         : row => ctrl.model.getDefaultDataSource().getRowKey(row),
            onDoubleClick     : ctrl.onGridCellDblClick,
            onDeleteKeyDown   : ctrl.onGridDeleteKeyDown,
            onSelectionChange : ctrl.onGridSelectionChange,
            onLinkClick       : ctrl.onGridLinkClick,
            renderGridCellView: this.renderGridCellView,
            updated           : ctrl.getUpdated(),
            extraColumn       : this.getGridExtraColumn(),
            selectedKey       : ctrl.getParent().getModel().options.selectedKey,
            createLinkCallback: this.createLinkCallback,
        });
    }
    render() {
        console.log('TableFormView.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} full flex-column grid-gap-5`} style={this.getStyle()}>
            {this.renderToolbar()}
            {this.renderGrid()}
            {ctrl.getModel().hasDefaultSqlDataSource() && this.renderPaging()}
        </div>;
    }
    createLinkCallback = key => {
        return PageController.createLink({
            page: this.getCtrl().getModel().getAttr('itemEditPage'),
            ...DataSource.keyToParams(key)
        });
    }
}
window.QForms.TableFormView = TableFormView;
