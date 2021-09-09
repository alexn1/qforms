class Grid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            key        : null,
            column     : null,
            columnWidth: {},
            resized    : Date.now(),
        };
        this.columns = {};                      // each column is the array of each cell view
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
        // console.log('Grid.setActiveRowKey', key);
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
        const button = e.button;
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        await this.selectCell(key, j);
        if (button === 0 && this.props.onClick) {
            this.props.onClick(row, key);
        }
    }
    onCellDoubleClick = async e => {
        // console.log('Grid.onCellDoubleClick');
        const button = e.button;
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        // console.log('row:', row);
        if (button === 0 && this.props.onDoubleClick) {
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
    onKeyDown = async e => {
        // console.log('Grid.onKeyDown', e.keyCode, e.ctrlKey, e.shiftKey);
        switch (e.keyCode) {
            case 37:
                e.preventDefault();
                await this.onLeft();
                break;
            case 38:
                e.preventDefault();
                await this.onUp();
                break;
            case 39:
                e.preventDefault();
                await this.onRight();
                break;
            case 40:
                e.preventDefault();
                await this.onDown();
                break;
            case 13:
                e.preventDefault();
                await this.onEnter();
                break;
            case 46:
                e.preventDefault();
                await this.onDelete();
                break;
            case 67:
                if (e.ctrlKey) {
                    e.preventDefault();
                    await this.onCopy();
                }
                break;
        }
    }
    async onCopy() {
        console.log('Grid.onCopy');
        const row = this.findRow(this.getActiveRowKey());
        const column = this.props.columns[this.getActiveColumn()].name;
        const text = row[column];
        await Helper.copyTextToClipboard(text);
    }
    findRow(key) {
        return this.props.rows.find(row => this.getRowKey(row) === key);
    }
    async onLeft() {
        console.log('Grid.onLeft');
        const j = this.getActiveColumn();
        if (j - 1 >= 0) {
            this.setActiveColumn(j - 1);
            await this.rerender();
        }
    }
    async onUp() {
        console.log('Grid.onUp');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        const i = this.props.rows.indexOf(row);
        if (i - 1 >= 0) {
            const pRow = this.props.rows[i - 1];
            const pKey = this.getRowKey(pRow);
            this.setActiveRowKey(pKey);
            await this.rerender();
        }
    }
    async onRight() {
        console.log('Grid.onRight');
        const j = this.getActiveColumn();
        if (j + 1 <= this.props.columns.length - 1) {
            this.setActiveColumn(j + 1);
            await this.rerender();
        }
    }
    async onDown() {
        console.log('Grid.onDown');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        const i = this.props.rows.indexOf(row);
        if (i + 1 <= this.props.rows.length - 1) {
            const nRow = this.props.rows[i + 1];
            const nKey = this.getRowKey(nRow);
            this.setActiveRowKey(nKey);
            await this.rerender();
        }
    }
    async onEnter() {
        console.log('Grid.onEnter');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.log(row, key);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    }
    async onDelete() {
        console.log('Grid.onDelete');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.log(row, key);
        if (this.props.onDeleteClick) {
            await this.props.onDeleteClick(row, key);
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
            <div className={'Grid__td'} key={column.name} style={{width: this.getColumnWidth(i)}}>
                <div>{column.title || column.name}</div>
                <span className="resize" data-i={i} onDoubleClick={this.onResizeDoubleClick}></span>
            </div>
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
            <div className={this.getClassName()}
                 tabIndex={0}
                 onKeyDown={this.onKeyDown}
            >
                <div className={`${this.constructor.name}__head`} ref={this.head}>
                    <div className={`${this.constructor.name}__table`}>
                        <div className={'Grid__tr'}>
                            {this.props.columns && this.renderColumns()}
                            <div className={'Grid__td'}/>
                        </div>
                    </div>
                </div>
                <div className={`${this.constructor.name}__body`} onScroll={this.onBodyScroll}>
                    <div className={`${this.constructor.name}__table`}>
                        {this.props.rows && this.renderRows()}
                    </div>
                </div>
            </div>
        );
    }
}

window.QForms.Grid = Grid;
