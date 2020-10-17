class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column: null,
            row   : null,
            columnWidth: {}
        };
        this.columns = {};
    }
    isRowActive(i) {
        return i === this.state.row;
    }
    isCellActive(i, j) {
        return i === this.state.row && j === this.state.column;
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
        if (this.state.row === i && this.state.column === j) return;
        const start = new Date().getTime();
        this.setState({row: i, column: j}, () => {
            console.log('selectCell time:', new Date().getTime() - start);
        });
    }
    selectRow(i) {
        if (this.state.row === i ) return;
        const start = new Date().getTime();
        this.setState({row: i}, () => {
            console.log('selectRow time:', new Date().getTime() - start);
        });
    }
    onResizeDoubleClick = e => {
        console.log('Grid.onResizeDoubleClick', e.target);
        const i = parseInt(e.target.dataset.i);
        const column = this.props.columns[i];
        column.name
        const maxOffsetWidth = Math.max(...this.columns[column.name].map(fieldView => fieldView.span.current.offsetWidth));
        console.log('maxOffsetWidth:', maxOffsetWidth);
        this.state.columnWidth[column.name] = maxOffsetWidth + 10;
        this.rerender();
        // console.log('column:', this.columns[column.name]);
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
    onFieldViewCreated = c => {
        // console.log('Grid.onFieldViewCreated', c.props.column.name);
        const columnName = c.props.column.name;
        if (this.columns[columnName] === undefined) this.columns[columnName] = [];
        this.columns[columnName].push(c);
    }
    renderRow(row, i) {
        return (
            <tr
                key={this.getRowKey(row)}
                data-key={this.getRowKey(row)}
                className={this.isRowActive(i) ? 'active' : undefined}
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
                        <TableFormTextBoxFieldView row={row} column={column} cb={this.onFieldViewCreated}/>
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
                <div className="head"><table><tbody><tr>{this.props.columns && this.renderColumns()}<td/></tr></tbody></table></div>
                <div className="block"/>
                <div className="body"><table><tbody>{this.props.rows && this.renderRows()}</tbody></table></div>
            </div>
        );
    }
}
