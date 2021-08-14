class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            key        : null,
            column     : null,
            columnWidth: {},
            resized    : Date.now(),
        };
        this.columns = {};
        this.head = React.createRef();
    }
    getActiveColumn() {
        return this.state.column;
    }
    setActiveColumn(column) {
        this.state.column = column;
    }
    getActiveRowKey() {
        return this.state.key;
    }
    setActiveRowKey(key) {
        console.log('Grid.setActiveRowKey', key);
        this.state.key = key;
    }
    isRowActive(i, key) {
        return this.getActiveRowKey() === key;
    }
    onRowMouseDown = async e => {
        // console.log('Grid.onRowMouseDown', e.currentTarget.dataset);
        const key = e.currentTarget.dataset.row;
        await this.selectRow(key);
    }
    onCellMouseDown = async e => {
        // console.log('Grid.onCellMouseDown', e.currentTarget.dataset);
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const key = e.currentTarget.dataset.row;
        await this.selectCell(key, j);
    }
    onCellDoubleClick = async e => {
        // console.log('Grid.onCellDoubleClick');
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        // console.log('row:', row);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    }

    onRowDoubleClick = async e => {
        // console.log('Grid.onRowDoubleClick');
        const i = parseInt(e.currentTarget.dataset.r);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        // console.log('row:', row);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    }
    async selectCell(key, j) {
        // console.log('Grid.selectCell', key, j);
        if (this.getActiveRowKey() === key && this.getActiveColumn() === j) return;
        this.setActiveRowKey(key);
        this.setActiveColumn(j);
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(key);
        } else {
            await this.rerender();
        }
    }
    async selectRow(key) {
        // console.log('Grid.selectRow', key);
        if (this.getActiveRowKey() === key) return;
        this.setActiveRowKey(key);
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(key);
        } else {
            await this.rerender();
        }
    }
    getMaxColumnWidth(column) {
        return Math.max(...this.columns[column.name].map(view => view.getSpanOffsetWidth())) + 10;
    }
    onResizeDoubleClick = async e => {
        console.log('Grid.onResizeDoubleClick', e.target);
        const i = parseInt(e.target.dataset.i);
        const column = this.props.columns[i];
        if (this.state.columnWidth[column.name] === this.getMaxColumnWidth(column)) return;
        this.state.columnWidth[column.name] = this.getMaxColumnWidth(column);
        this.state.resized = Date.now();
        await this.rerender();
    }
    getColumnWidth(i) {
        const columnName = this.props.columns[i].name;
        if (this.state.columnWidth[columnName] !== undefined) return `${this.state.columnWidth[columnName]}px`;
        if (this.props.columns[i].width) return `${this.props.columns[i].width}px`;
        return null;
    }
    renderColumns() {
        return this.props.columns.map((column, i) =>
            <td key={column.name} style={{width: this.getColumnWidth(i)}}>
                <div>{column.title || column.name}</div>
                <span className="resize" data-i={i} onDoubleClick={this.onResizeDoubleClick}></span>
            </td>
        );
    }
    renderRows() {
        return this.props.rows.map((row, i) => {
            const key = this.getRowKey(row);
            return <GridRow
                key={key}
                rowKey={key}
                grid={this}
                row={row}
                i={i}
                active={this.isRowActive(i, key)}
                activeColumn={this.getActiveColumn()}
                updated={this.props.updated}
                resized={this.state.resized}
            />;
        });
    }
    getRowKey(row) {
        if (this.props.getRowKey) {
            return this.props.getRowKey(row);
        }
        return this.props.rows.indexOf(row).toString();
    }
    onCellViewCreate = c => {
        // console.log('Grid.onCellViewCreate', c.props.column.name);
        const columnName = c.props.column.name;
        if (this.columns[columnName] === undefined) this.columns[columnName] = [];
        this.columns[columnName].push(c);
    }
    onCellViewUnmount = c => {
        // console.log('Grid.onCellViewUnmount', c.props.column.name);
        const columnName = c.props.column.name;
        const i = this.columns[columnName].indexOf(c);
        if (i === -1) throw new Error('cannot find FieldView in Grid.columns');
        this.columns[columnName].splice(i, 1);
    }
    onBodyScroll = async e => {
        // console.log('Grid.onBodyScroll', e.target.scrollLeft);
        this.head.current.scrollLeft = e.target.scrollLeft;
    }
    renderCell(row, column) {
        let view;
        if (this.props.renderGridCellView) {
            view = this.props.renderGridCellView(row, column, this.onCellViewCreate, this.onCellViewUnmount);
        }
        if (view) return view;
        return <GridCell
            row={row}
            column={column}
            onCreate={this.onCellViewCreate}
            onUnmount={this.onCellViewUnmount}
        />;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Grid.shouldComponentUpdate', this.props.name, nextProps.updated - this.props.updated);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated) return true;
            return false;
        }
        return true;
    }
    render() {
        // console.log('Grid.render', this.props.name);
        return (
            <div className={this.getClassName()}>
                <div className="head" ref={this.head}><table><tbody><tr>{this.props.columns && this.renderColumns()}<td/></tr></tbody></table></div>
                <div className="block"/>
                <div className="body" onScroll={this.onBodyScroll}>
                    <table>
                        <tbody>{this.props.rows && this.renderRows()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

window.QForms.Grid = Grid;
