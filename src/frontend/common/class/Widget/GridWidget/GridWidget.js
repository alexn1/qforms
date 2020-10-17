'use strict';

$(document).ready(() => {
    console.log('GridWidget document ready');
    $('div.GridWidget').each(function() {
        this._obj = new GridWidget(this);
        this._obj.init();
    });
});

class GridWidget extends Widget {

    constructor(el) {
        super(el);
        this.gridColumns        = {};
        this.bodyTable          = null;
        this.selectedBodyRow    = null;
        this.selectedBodyCell   = null;
        this.selectedColumnName = null; // field name of selected column
        this.scrollTop          = 0;
    }

    init() {
        const self = this;
        //console.log('GridWidget.init', self.el);

        // columns
        $(self.el).children('div.head').children('table').children('tbody').children('tr').children('td').each(function () {
            const td = this;
            const columnName = $(td).data('column-name');
            if (columnName !== undefined) {
                self.gridColumns[columnName] = self.createColumn(columnName, td);
            }
        });

        // bodyTable
        if ($(self.el).find('div.body > table > tbody').length < 1) {
            $(self.el).append('<div class="body"><table><tbody></tbody></table></div>');
        }
        const $divBodyTableTBody = $(self.el).find('div.body > table > tbody');
        self.bodyTable = $divBodyTableTBody.get(0);
        $(self.el).find('div.body').scroll(function () {
            self.onBodyScroll(this);
        });
        //console.log('self.bodyTable', self.bodyTable);
        $(self.el).keydown(function(e) {
            self.onKeyDown(e);
        });
    }

    onKeyDown(e) {
        console.log('GridWidget.onKeyDown', e.key);
        if (e.key === 'Enter') {
            this.emit('bodyCellDblClick', {source: this, bodyCell: this.selectedBodyCell});
        } else if (e.key === 'ArrowDown') {
            const i = QForms.elementIndex(this.selectedBodyRow);
            // console.log('i:', i);
            if (this.bodyTable.childNodes[i + 1]) {
                this.selectBodyRow(this.bodyTable.childNodes[i + 1]);
            }
        } else if (e.key === 'ArrowUp') {
            const i = QForms.elementIndex(this.selectedBodyRow);
            // console.log('i:', i);
            if (i > 0) {
                this.selectBodyRow(this.bodyTable.childNodes[i - 1]);
            }
        } else if (e.key === 'ArrowLeft') {
            const i = QForms.elementIndex(this.selectedBodyCell);
            // console.log('i:', i);
            if (i > 0) {
                this.selectBodyCell(this.selectedBodyCell.parentNode.childNodes[i - 1]);
            }
        } else if (e.key === 'ArrowRight') {
            const len = Object.keys(this.gridColumns).length;
            const i = QForms.elementIndex(this.selectedBodyCell);
            // console.log('i:', i);
            if (i + 1 < len) {
                this.selectBodyCell(this.selectedBodyCell.parentNode.childNodes[i + 1]);
            }
        }
    }

    deinit() {
        for (const columnName in this.gridColumns) {
            this.gridColumns[columnName].deinit();
        }
    }

    onBodyScroll(el) {
        el.parentElement.querySelector('.head').scrollLeft = el.scrollLeft;
    }

    createColumn(fieldName, headerCell) {
        const gridColumn = new GridColumn(this, fieldName, headerCell);
        gridColumn.init();
        return gridColumn;
    }

    createBodyRow(i) {
        const bodyRow = document.createElement('tr');
        bodyRow.qI        = i;
        bodyRow.bodyCells = {};
        for (const columnName in this.gridColumns) {
            const bodyCell = this.createBodyCell(columnName);
            bodyCell.bodyRow = bodyRow;
            bodyRow.appendChild(bodyCell);
            bodyRow.bodyCells[columnName] = bodyCell;
        }
        bodyRow.appendChild(document.createElement('td'));
        QForms.insertNewNodeAt(this.bodyTable, bodyRow, i);
        return bodyRow;
    }

    removeBodyRows() {
        this.selectedBodyRow  = null;
        this.selectedBodyCell = null;
        $(this.bodyTable).empty();
        this.bodyTable.scrollTop = 0;
    }

    createBodyCell(name) {
        const self = this;
        const view = self.gridColumns[name].renderView();
        // bodyCell
        const bodyCell = window.document.createElement('td');
        bodyCell.style.width = self.gridColumns[name].headerCell.style.width;
        bodyCell.qFieldName = name;
        bodyCell.appendChild(view);
        bodyCell.onmousedown = function(e) {
            if (e.button === 0 || e.button === 2) {
                self.onBodyCellMouseDown(this);
            }
        };
        bodyCell.ondblclick = function() {
            self.onBodyCellDblClick(this);
        };
        bodyCell.onkeypress = function(e) {
            if (e.which === 13) {
                self.onEnterPress(this);
                return false;
            }
        };
        bodyCell.onkeydown = function(e) {
            if (e.keyCode === 27) {
                self.onEscPress(this);
            }
        };
        return bodyCell;
    }

    onBodyCellMouseDown(bodyCell) {
        // console.log('GridWidget.onBodyCellMouseDown');
        // if clicked on selected, then do nothing
        if (this.selectedBodyCell && this.selectedBodyCell === bodyCell) {
            return;
        }
        this.selectBodyRow(bodyCell.bodyRow);
        this.selectBodyCell(bodyCell);
    }

    onBodyCellDblClick(bodyCell) {
        // console.log('GridWidget.onBodyCellDblClick', bodyCell);
        this.emit('bodyCellDblClick', {source: this, bodyCell: bodyCell});
    }

    onEnterPress(bodyCell) {
        this.gridColumns[bodyCell.qFieldName].enterPress(bodyCell);
    }

    onEscPress(bodyCell) {
        this.gridColumns[bodyCell.qFieldName].escPress(bodyCell);
    }

    selectBodyCell(bodyCell) {
        this.unselectBodyCellIfSelected();
        bodyCell.classList.add('active');
        this.selectedBodyCell   = bodyCell;
        this.selectedColumnName = bodyCell.qFieldName;
    }

    unselectBodyCellIfSelected() {
        if (this.selectedBodyCell !== null) {
            this.gridColumns[this.selectedBodyCell.qFieldName].unselected(this.selectedBodyCell);
            this.selectedBodyCell.classList.remove('active');
            this.selectedBodyCell = null;
        }
    }

    selectBodyRow(bodyRow) {
        if (this.selectedBodyRow !== null) {
            if (this.selectedBodyRow == bodyRow) {
                return;
            }
            this.unselectBodyCellIfSelected();
            this.unselectBodyRowIfSelected();
        }
        bodyRow.classList.add('active');
        this.selectedBodyRow = bodyRow;
        if (this.selectedBodyCell === null && this.selectedColumnName !== null) {
            const bodyCellToSelect = this.selectedBodyRow.bodyCells[this.selectedColumnName];
            this.selectBodyCell(bodyCellToSelect);
        }
    }

    unselectBodyRowIfSelected() {
        if (this.selectedBodyRow !== null) {
            this.selectedBodyRow.classList.remove('active');
            this.selectedBodyRow = null;
        }
    }

    saveScroll() {
        this.scrollTop = this.bodyTable.scrollTop;
        //console.log('hide scrollTop: ' + this.scrollTop);
    }

    restoreScroll() {
        console.log('GridWidget.restoreScroll');
        this.bodyTable.scrollTop = this.scrollTop;
        //console.log('show scrollTop: ' + this.scrollTop);
    }

    focus() {
        // console.log('GridWidget.focus', this.el);
        this.el.focus();
    }

    isHidden() {
        return this.el.offsetParent === null;
    }

}
