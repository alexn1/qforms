class GridRow extends ReactComponent {
    isCellActive(j) {
        return this.props.active && this.props.activeColumn === j;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('GridRow.shouldComponentUpdate', nextProps.updated - this.props.updated);
        if (nextProps.updated - this.props.updated) return true;
        if (this.props.active !== nextProps.active) return true;
        if (this.props.active && this.props.activeColumn !== nextProps.activeColumn) return true;
        return false;
    }
    render() {
        // console.log('GridRow.render', this.props.i);
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
