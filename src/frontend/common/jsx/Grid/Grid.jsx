class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            row   : null,
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
        /*const start = new Date().getTime();
        this.setState({row: i, column: j}, () => {
            console.log('selectCell time:', new Date().getTime() - start);
        });*/
    }
    selectRow(i) {
        if (this.getActiveRow() === i ) return;
        this.setActiveRow(i);
        this.rerender();
        /*const start = new Date().getTime();
        this.setState({row: i}, () => {
            console.log('selectRow time:', new Date().getTime() - start);
        });*/
    }
    onResizeDoubleClick = e => {
        console.log('Grid.onResizeDoubleClick', e.target);
        const i = parseInt(e.target.dataset.i);
        const column = this.props.columns[i];
        const maxOffsetWidth = Math.max(...this.columns[column.name].map(fieldView => fieldView.getSpanOffsetWidth()));
        this.state.columnWidth[column.name] = maxOffsetWidth + 10;
        this.rerender();
        // console.log('maxOffsetWidth:', maxOffsetWidth);
        // console.log('this.state.columnWidth:', this.state.columnWidth);
    }
    getColumnWidth(i) {
        const columnName = this.props.columns[i].name;
        if (this.state.columnWidth[columnName] !== undefined) return `${this.state.columnWidth[columnName]}px`;
        return this.props.columns[i].width ? `${this.props.columns[i].width}px` : null;
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
        return this.props.rows.map((row, i) => this.renderRow(row, i));
    }
    getRowKey(row) {
        return this.props.getRowKey(row);
    }
    onFieldViewCreate = c => {
        // console.log('Grid.onFieldViewCreate', c.props.column.name);
        const columnName = c.props.column.name;
        if (this.columns[columnName] === undefined) this.columns[columnName] = [];
        this.columns[columnName].push(c);
    }
    onFieldViewUnmount = c => {
        // console.log('Grid.onFieldViewUnmount', c.props.column.name);
        const columnName = c.props.column.name;
        const i = this.columns[columnName].indexOf(c);
        if (i === -1) throw new Error('cannot find FieldView in Grid.columns');
        this.columns[columnName].splice(i, 1);
    }
    onBodyScroll = e => {
        // console.log('Grid.onBodyScroll', e.target.scrollLeft);
        this.head.current.scrollLeft = e.target.scrollLeft;
    }
    renderRow(row, i) {
        // console.log('Grid.renderRow', i);
        const key = this.getRowKey(row);
        return (
            <tr
                key={key}
                className={this.isRowActive(i) ? 'active' : null}
            >
                {this.props.columns.map((column, j) =>
                    <td
                        key={column.name}
                        style={{width: this.getColumnWidth(j)}}
                        className={this.isCellActive(i, j) ? 'active' : null}
                        data-rc={`[${i},${j}]`}
                        onMouseDown={this.onCellMouseDown}
                        onDoubleClick={this.onCellDoubleClick}
                    >
                        <TableFormTextBoxFieldView
                            row={row}
                            column={column}
                            onCreate={this.onFieldViewCreate}
                            onUnmount={this.onFieldViewUnmount}
                        />
                    </td>)}
                <td
                    data-r={i}
                    onMouseDown={this.onRowMouseDown}
                    onDoubleClick={this.onRowDoubleClick}
                />
            </tr>
        );
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
