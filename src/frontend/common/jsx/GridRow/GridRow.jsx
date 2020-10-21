class GridRow extends ReactComponent {
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('GridRow.shouldComponentUpdate', this.props.active, nextProps.active);
        // return this.props.active !== nextProps.active || (this.props.active && this.props.activeColumn !== nextProps.activeColumn);
        return true;
    }
    isCellActive(j) {
        return this.props.active && this.props.activeColumn === j;
    }
    render() {
        console.log('GridRow.render', this.props.i);

        const grid = this.props.grid;
        const row = this.props.row;
        const i = this.props.i;
        return <tr
            className={this.props.active ? 'active' : null}
        >
            {grid.props.columns.map((column, j) =>
                <td
                    key={column.name}
                    className={this.isCellActive(j) ? 'active' : null}
                    style={{width: grid.getColumnWidth(j)}}
                    data-rc={`[${i},${j}]`}
                    onMouseDown={grid.onCellMouseDown}
                    onDoubleClick={grid.onCellDoubleClick}
                >
                    {grid.renderCell(row, column)}
                </td>)}
            <td
                data-r={i}
                onMouseDown={grid.onRowMouseDown}
                onDoubleClick={grid.onRowDoubleClick}
            />
        </tr>;
    }
}
