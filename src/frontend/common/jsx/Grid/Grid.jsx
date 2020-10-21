class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column     : null,
            row        : null,
            columnWidth: {}
        };
        this.columns = {};
        this.head = React.createRef();
    }
    getActiveRow() {
        if (this.props.getActiveRow) return this.props.getActiveRow();
        return this.state.row;
    }
    setActiveRow(i) {
        this.state.row = i;
        if (this.props.onActiveRowChanged) this.props.onActiveRowChanged(i);
    }
    getActiveColumn() {
        return this.state.column;
    }
    isRowActive(i) {
        return i === this.getActiveRow();
    }
    isCellActive(i, j) {
        return i === this.getActiveRow() && j === this.getActiveColumn();
    }
    onCellMouseDown = e => {
        // console.log('Grid.onCellMouseDown', e.currentTarget.dataset);
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        this.selectCell(i, j);
    }
    onCellDoubleClick = e => {
        // console.log('Grid.onCellDoubleClick');
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        // console.log('row:', row);
        if (this.props.onDoubleClick) this.props.onDoubleClick(row);
    }
    onRowMouseDown = e => {
        // console.log('Grid.onRowMouseDown', e.currentTarget.dataset);
        const i = parseInt(e.currentTarget.dataset.r);
        this.selectRow(i);
    }
    onRowDoubleClick = e => {
        // console.log('Grid.onRowDoubleClick');
        const i = parseInt(e.currentTarget.dataset.r);
        const row = this.props.rows[i];
        // console.log('row:', row);
        if (this.props.onDoubleClick) this.props.onDoubleClick(row);
    }
    selectCell(i, j) {
        if (this.getActiveRow() === i && this.getActiveColumn() === j) return;
        this.setActiveRow(i);
        this.state.column = j;
        this.rerender();
    }
    selectRow(i) {
        if (this.getActiveRow() === i ) return;
        this.setActiveRow(i);
        this.rerender();
    }
    getMaxColumnWidth(column) {
        return Math.max(...this.columns[column.name].map(view => view.getSpanOffsetWidth())) + 10;
    }
    onResizeDoubleClick = e => {
        console.log('Grid.onResizeDoubleClick', e.target);
        const i = parseInt(e.target.dataset.i);
        const column = this.props.columns[i];
        this.state.columnWidth[column.name] = this.getMaxColumnWidth(column);
        this.rerender();
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
                <div>{column.title}</div>
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
    onBodyScroll = e => {
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
    renderRow(row, i) {
        // console.log('Grid.renderRow', i);
        return <GridRow
            key={this.getRowKey(row)}
            grid={this}
            row={row}
            i={i}
            active={this.isRowActive(i)}
            activeColumn={this.getActiveColumn()}
        />
        /*return (
            <tr
                key={key}
                className={this.isRowActive(i) ? 'active' : null}
            >
                {this.props.columns.map((column, j) =>
                    <td
                        key={column.name}
                        className={this.isCellActive(i, j) ? 'active' : null}
                        style={{width: this.getColumnWidth(j)}}
                        data-rc={`[${i},${j}]`}
                        onMouseDown={this.onCellMouseDown}
                        onDoubleClick={this.onCellDoubleClick}
                    >
                        {this.renderCell(row, column)}
                    </td>)}
                <td
                    data-r={i}
                    onMouseDown={this.onRowMouseDown}
                    onDoubleClick={this.onRowDoubleClick}
                />
            </tr>
        );*/
    }
    render() {
        return (
            <div className="Grid flex-max">
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
