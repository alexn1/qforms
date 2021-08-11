class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column     : null,
            row        : null,
            columnWidth: {},
            resized    : Date.now()
        };
        this.columns = {};
        this.head = React.createRef();
    }
    getActiveRowIndex() {
        if (this.props.getActiveRowIndex) return this.props.getActiveRowIndex();
        return this.state.row;
    }
    getActiveColumn() {
        return this.state.column;
    }
    isRowActive(i) {
        return i === this.getActiveRowIndex();
    }
    isCellActive(i, j) {
        return i === this.getActiveRowIndex() && j === this.getActiveColumn();
    }
    onCellMouseDown = async e => {
        // console.log('Grid.onCellMouseDown', e.currentTarget.dataset);
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        await this.selectCell(i, j);
    }
    onCellDoubleClick = async e => {
        // console.log('Grid.onCellDoubleClick');
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        // console.log('row:', row);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row);
        }
    }
    onRowMouseDown = async e => {
        // console.log('Grid.onRowMouseDown', e.currentTarget.dataset);
        const i = parseInt(e.currentTarget.dataset.r);
        await this.selectRow(i);
    }
    onRowDoubleClick = async e => {
        // console.log('Grid.onRowDoubleClick');
        const i = parseInt(e.currentTarget.dataset.r);
        const row = this.props.rows[i];
        // console.log('row:', row);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row);
        }
    }
    async selectCell(i, j) {
        // console.log('Grid.selectCell', i, j);
        if (this.getActiveRowIndex() === i && this.getActiveColumn() === j) return;
        this.state.row    = i;
        this.state.column = j;
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(i);
        } else {
            await this.rerender();
        }
    }
    async selectRow(i) {
        // console.log('Grid.selectRow', i);
        if (this.getActiveRowIndex() === i ) return;
        this.state.row = i;
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(i);
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
        return this.props.rows.map((row, i) =>
            <GridRow
                key={this.getRowKey(row)}
                grid={this}
                row={row}
                i={i}
                active={this.isRowActive(i)}
                activeColumn={this.getActiveColumn()}
                updated={this.props.updated}
                resized={this.state.resized}
            />
        );
    }
    getRowKey(row) {
        return this.props.getRowKey(row);
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
