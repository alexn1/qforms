class GridRow extends ReactComponent {
    isCellActive(j) {
        return this.props.active && this.props.activeColumn === j;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('GridRow.shouldComponentUpdate', nextProps.updated - this.props.updated, nextProps.resized - this.props.resized);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated) return true;
            if (nextProps.resized - this.props.resized) return true;
            if (this.props.active !== nextProps.active) return true;
            if (this.props.active && this.props.activeColumn !== nextProps.activeColumn) return true;
            return false;
        }
        return true;
    }

    render() {
        // console.log('GridRow.render', this.props.i);
        const grid = this.props.grid;
        const row = this.props.row;
        const i = this.props.i;
        const key = this.props.rowKey;
        const link = grid.props.createLinkCallback ? grid.props.createLinkCallback(key) : null;
        return <a
            className={`${grid.getGridBlockName()}__tr ${this.props.active ? 'active' : ''}`}
            data-key={key}
            href={link}
            onClick={grid.onLinkClick}
        >
            {grid.props.columns.map((column, j) =>
                <div
                    key={column.name}
                    className={`${grid.getGridBlockName()}__td ${this.isCellActive(j) ? 'active' : ''}`}
                    style={{width: grid.getColumnWidth(j)}}
                    data-rc={`[${i},${j}]`}
                    data-row={key}
                    onMouseDown={grid.onCellMouseDown}
                    onDoubleClick={grid.onCellDoubleClick}
                >
                    {grid.renderCell(row, column)}
                </div>)}
            <div className={`${grid.getGridBlockName()}__td`}
                data-r={i}
                data-row={key}
                onMouseDown={grid.onRowMouseDown}
                onDoubleClick={grid.onRowDoubleClick}
            />
        </a>;
    }
}

window.QForms.GridRow = GridRow;
