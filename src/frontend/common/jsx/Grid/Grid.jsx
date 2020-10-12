class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column: 1,
            row: 0
        };
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
        console.log('row:', row);
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
        console.log('row:', row);
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
    renderColumns() {
        return this.props.columns.map((column, i) => <td key={column.name} style={{width: `${column.width}px`}}>
            <div>{column.title}</div>
            <span className="resize"></span>
        </td>);
    }
    renderRows() {
        return this.props.rows.map((row, i) => this.renderRow(row, i));
    }
    renderRow(row, i) {
        return (
            <tr
                key={row[this.props.options.keyColumn].toString()}
                className={this.isRowActive(i) ? 'active' : undefined}
            >
                {this.props.columns.map((column, j) =>
                    <td
                        key={column.name}
                        style={{width: `${column.width}px`}}
                        className={this.isCellActive(i, j) ? 'active' : undefined}
                        data-rc={`[${i},${j}]`}
                        onMouseDown={this.onCellMouseDown}
                        onDoubleClick={this.onCellDoubleClick}
                    >
                        <div className="TableFormTextBoxFieldView">
                            <span>{row[column.name]}</span>
                        </div>
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
            <div className="Grid">
                <div className="head"><table><tbody><tr>{this.renderColumns()}<td/></tr></tbody></table></div>
                <div className="block"/>
                <div className="body"><table><tbody>{this.renderRows()}</tbody></table></div>
            </div>
        );
    }
}
