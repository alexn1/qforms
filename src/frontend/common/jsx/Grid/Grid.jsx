class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            column: 1,
            row: 0
        };
    }
    renderColumns() {
        return this.props.columns.map((column, i) => <td key={column.name} style={{width: `${column.width}px`}}>
            <div>{column.title}</div>
            <span className="resize"></span>
        </td>);
    }
    isRowActive(i) {
        return i === this.state.row;
    }
    isCellActive(i, j) {
        return i === this.state.row && j === this.state.column;
    }
    renderRow(row, i) {
        return (
            <tr key={row[this.props.options.keyColumn].toString()} className={`${this.isRowActive(i) ? 'active' : ''}`}>
                {this.props.columns.map((column, j) =>
                    <td key={column.name} style={{width: `${column.width}px`}} className={`${this.isCellActive(i, j) ? 'active' : ''}`}>
                        <div>{row[column.name]}</div>
                    </td>)}
                <td></td>
            </tr>
        );
    }
    render() {
        return (
            <div className="Grid">
                <div className="head">
                    <table>
                        <tbody>
                            <tr>
                                {this.renderColumns()}
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="block"/>
                <div className="body">
                    <table>
                        <tbody>
                            {this.props.rows.map((row, i) => this.renderRow(row, i))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
