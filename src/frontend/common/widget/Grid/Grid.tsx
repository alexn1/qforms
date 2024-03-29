import React from 'react';
import { ReactComponent } from '../../ReactComponent';
import { GridRow } from '../GridRow/GridRow';
import { GridCell } from '../GridCell/GridCell';
import { ClipboardHelper } from '../../ClipboardHelper';
import './Grid.less';

export class Grid extends ReactComponent {
    columns: any;
    head: React.RefObject<any>;

    constructor(props) {
        // console.debug('Grid.constructor', props);
        super(props);
        this.state = {
            key: this.props.selectedKey || null,
            column:
                this.props.selectedKey && this.props.columns && this.props.columns.length
                    ? 0
                    : null,
            columnWidth: {},
            resized: Date.now(),
        };
        this.columns = {}; // each column is the array of each cell view
        this.el = React.createRef();
        this.head = React.createRef();
    }

    getActiveColumn() {
        return this.state.column;
    }

    setActiveColumn(column) {
        // @ts-ignore
        this.state.column = column;
    }

    getActiveRowKey() {
        return this.state.key;
    }

    setActiveRowKey(key) {
        // console.debug('Grid.setActiveRowKey', key);
        // @ts-ignore
        this.state.key = key;
    }

    isRowActive(i, key) {
        return this.getActiveRowKey() === key;
    }

    onCellMouseDown = async (e) => {
        console.debug('Grid.onCellMouseDown', this.isLink());
        e.preventDefault(); // prevent text selection on double click
        if (this.isDisabled()) return;
        this.getElement().focus();
        // if (this.isLink()) return;
        const button = e.button;
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        await this.selectCell(key, j);
        if (button === 0 && this.props.onClick) {
            this.props.onClick(row, key);
        }
    };

    onRowMouseDown = async (e) => {
        console.debug('Grid.onRowMouseDown', this.isLink());
        // if (this.isLink()) return;
        const key = e.currentTarget.dataset.row;
        await this.selectRow(key);
    };

    onCellDoubleClick = async (e) => {
        // console.debug('Grid.onCellDoubleClick');
        const button = e.button;
        const [i, j] = JSON.parse(e.currentTarget.dataset.rc);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        // console.debug('row:', row);
        if (button === 0 && this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    };

    onRowDoubleClick = async (e) => {
        // console.debug('Grid.onRowDoubleClick');
        const i = parseInt(e.currentTarget.dataset.r);
        const row = this.props.rows[i];
        const key = e.currentTarget.dataset.row;
        // console.debug('row:', row);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    };

    onKeyDown = async (e) => {
        // console.debug('Grid.onKeyDown', e.keyCode, e.ctrlKey, e.shiftKey);
        if (this.isDisabled()) return;
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
    };

    async onCopy() {
        console.debug('Grid.onCopy');
        const row = this.findRow(this.getActiveRowKey());
        const column = this.props.columns[this.getActiveColumn()].name;
        const text = row[column];
        await ClipboardHelper.copyTextToClipboard(text);
    }

    findRow(key) {
        return this.props.rows.find((row) => this.getRowKey(row) === key);
    }

    async onLeft() {
        console.debug('Grid.onLeft');
        const j = this.getActiveColumn();
        if (j - 1 >= 0) {
            this.setActiveColumn(j - 1);
            await this.rerender();
        }
    }

    async onUp() {
        console.debug('Grid.onUp');
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
        console.debug('Grid.onRight');
        const j = this.getActiveColumn();
        if (j + 1 <= this.props.columns.length - 1) {
            this.setActiveColumn(j + 1);
            await this.rerender();
        }
    }

    async onDown() {
        console.debug('Grid.onDown');
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
        console.debug('Grid.onEnter');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.debug(row, key);
        if (this.props.onDoubleClick) {
            await this.props.onDoubleClick(row, key);
        }
    }

    async onDelete() {
        console.debug('Grid.onDelete');
        const key = this.getActiveRowKey();
        const row = this.findRow(key);
        // console.debug(row, key);
        if (this.props.onDeleteKeyDown) {
            await this.props.onDeleteKeyDown(row, key);
        }
    }

    async selectCell(key, j) {
        // console.debug('Grid.selectCell', key, j);
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
        // console.debug('Grid.selectRow', key);
        if (this.getActiveRowKey() === key) return;
        this.setActiveRowKey(key);
        if (this.props.onSelectionChange) {
            await this.props.onSelectionChange(key);
        } else {
            await this.rerender();
        }
    }

    getMaxColumnWidth(column) {
        return (
            Math.max(...this.columns[column.name].map((view) => view.getSpanOffsetWidth())) + 10 + 2
        );
    }

    onResizeDoubleClick = async (e) => {
        console.debug('Grid.onResizeDoubleClick', e.target);
        const i = parseInt(e.target.dataset.i);
        const column = this.props.columns[i];
        if (this.state.columnWidth[column.name] === this.getMaxColumnWidth(column)) return;
        this.state.columnWidth[column.name] = this.getMaxColumnWidth(column);
        // @ts-ignore
        this.state.resized = Date.now();
        await this.rerender();
    };

    getColumnWidth(i) {
        const column = this.props.columns[i];
        if (this.state.columnWidth[column.name] !== undefined) {
            return this.state.columnWidth[column.name];
        }
        return column.width;
    }

    renderColumns() {
        return this.props.columns.map((column, i) => (
            <div
                className={`${this.getCssBlockName()}__th`}
                key={column.name}
                style={{ width: this.getColumnWidth(i) }}>
                <div className={'ellipsis'} style={{ textAlign: column.align }}>
                    {column.title || column.name}
                </div>
                <span
                    className={'Grid__resize'}
                    data-i={i}
                    onDoubleClick={this.onResizeDoubleClick}></span>
            </div>
        ));
    }

    renderRows() {
        return this.props.rows.map((row, i) => {
            const key = this.getRowKey(row);
            return (
                <GridRow
                    key={key}
                    rowKey={key}
                    grid={this}
                    row={row}
                    i={i}
                    active={this.isRowActive(i, key)}
                    activeColumn={this.getActiveColumn()}
                    updated={this.props.updated}
                    resized={this.state.resized}
                />
            );
        });
    }

    getRowKey(row) {
        if (this.props.getRowKey) {
            return this.props.getRowKey(row);
        }
        return this.props.rows.indexOf(row).toString();
    }

    onCellViewCreate = (c) => {
        // console.debug('Grid.onCellViewCreate', c.props.column.name);
        const columnName = c.props.column.name;
        if (this.columns[columnName] === undefined) this.columns[columnName] = [];
        this.columns[columnName].push(c);
    };

    onCellViewUnmount = (c) => {
        // console.debug('Grid.onCellViewUnmount', c.props.column.name);
        const columnName = c.props.column.name;
        const i = this.columns[columnName].indexOf(c);
        if (i === -1) throw new Error('cannot find FieldView in Grid.columns');
        this.columns[columnName].splice(i, 1);
    };

    onBodyScroll = async (e) => {
        // console.debug('Grid.onBodyScroll', e.target.scrollLeft);
        this.head.current.scrollLeft = e.target.scrollLeft;
    };

    renderCell(row, column) {
        let view;
        if (this.props.renderGridCellView) {
            view = this.props.renderGridCellView(
                row,
                column,
                this.onCellViewCreate,
                this.onCellViewUnmount,
            );
        }
        if (view) return view;
        return (
            <GridCell
                grid={this}
                row={row}
                column={column}
                onCreate={this.onCellViewCreate}
                onUnmount={this.onCellViewUnmount}
            />
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('Grid.shouldComponentUpdate', this.props.name, nextProps.updated - this.props.updated);
        if (this.props.updated) {
            if (nextProps.updated - this.props.updated) return true;
            return false;
        }
        return true;
    }

    render() {
        // console.debug('Grid.render', this.props.name);
        return (
            <div
                className={`${this.getCssClassNames()} ${this.isDisabled() ? 'disabled' : ''}`}
                ref={this.el}
                tabIndex={0}
                onKeyDown={this.onKeyDown}>
                <div className={`${this.getCssBlockName()}__head`} ref={this.head}>
                    <div className={`${this.getCssBlockName()}__table`}>
                        <div className={`${this.getCssBlockName()}__tr`}>
                            {this.props.columns && this.renderColumns()}
                            {!!this.props.extraColumn && (
                                <div className={`${this.getCssBlockName()}__th`} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${this.getCssBlockName()}__body`} onScroll={this.onBodyScroll}>
                    <div className={`${this.getCssBlockName()}__table`}>
                        {this.props.rows && this.renderRows()}
                    </div>
                </div>
            </div>
        );
    }

    isLink() {
        return !!this.props.createLinkCallback;
    }

    onLinkClick = async (e) => {
        console.debug('Grid.onLinkClick', e.ctrlKey);
        if (e.ctrlKey) return;
        e.preventDefault();
        /* if (!this.isLink()) return;
        const key = e.currentTarget.dataset.key;
        if (this.props.onLinkClick) {
            await this.props.onLinkClick(key);
        } */
    };
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Grid = Grid;
}
