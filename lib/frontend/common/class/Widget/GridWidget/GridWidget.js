'use strict';

QForms.inherits(GridWidget, Widget);

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $('div.GridWidget').each(function() {
        this._obj = new GridWidget(this);
        this._obj.init();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function GridWidget(el) {
    var self = this;
    GridWidget.super_.call(self, el);
    self.gridColumns        = {};
    self.bodyTable          = null;
    self.selectedBodyRow    = null;
    self.selectedBodyCell   = null;
    self.selectedColumnName = null; // field name of selected column
    self.scrollTop          = 0;
    //this.eventBodyCellDblClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.init = function() {
    var self = this;
    //console.log('GridWidget.prototype.init', self.el);

    // columns
    $(self.el).children('div.head').children('table').children('tbody').children('tr').children('td').each(function () {
        var td = this;
        var columnName = $(td).data('column-name');
        if (columnName !== undefined) {
            self.gridColumns[columnName] = self.createColumn(columnName, td);
        }
    });

    // bodyTable
    if ($(self.el).find('div.body > table > tbody').length < 1) {
        $(self.el).append('<div class="body"><table><tbody></tbody></table></div>');
    }
    var $divBodyTableTBody = $(self.el).find('div.body > table > tbody');
    self.bodyTable = $divBodyTableTBody.get(0);
    $(self.el).find('div.body').scroll(function () {
        self.onBodyScroll(this);
    });
    //console.log('self.bodyTable', self.bodyTable);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.deinit = function() {
    var self = this;
    for (var columnName in self.gridColumns) {
        this.gridColumns[columnName].deinit();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyScroll = function(el) {
    var self = this;
    el.parentElement.querySelector('.head').scrollLeft = el.scrollLeft;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createColumn = function(fieldName, headerCell) {
    var self = this;
    var gridColumn = new GridColumn(self, fieldName, headerCell);
    gridColumn.init();
    return gridColumn;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createBodyRow = function(i) {
    var self = this;
    var bodyRow = document.createElement('tr');
    bodyRow.qI        = i;
    bodyRow.bodyCells = {};
    for (var columnName in self.gridColumns) {
        var bodyCell = self.createBodyCell(columnName);
        bodyCell.bodyRow = bodyRow;
        bodyRow.appendChild(bodyCell);
        bodyRow.bodyCells[columnName] = bodyCell;
    }
    bodyRow.appendChild(document.createElement('td'));
    QForms.insertNewNodeAt(self.bodyTable, bodyRow, i);
    return bodyRow;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.removeBodyRows = function() {
    var self = this;
    self.selectedBodyRow  = null;
    self.selectedBodyCell = null;
    $(self.bodyTable).empty();
    self.bodyTable.scrollTop = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createBodyCell = function(name) {
    var self = this;
    var view = self.gridColumns[name].renderView();
    // bodyCell
    var bodyCell = window.document.createElement('td');
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
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyCellMouseDown = function(bodyCell) {
    var self = this;
    // if clicked on selected, then do nothing
    if (self.selectedBodyCell && self.selectedBodyCell === bodyCell) {
        return;
    }
    self.selectBodyRow(bodyCell.bodyRow);
    self.selectBodyCell(bodyCell);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyCellDblClick = function(bodyCell) {
    var self = this;
    self.emit('bodyCellDblClick', {source: self, bodyCell: bodyCell});
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onEnterPress = function(bodyCell) {
    var self = this;
    self.gridColumns[bodyCell.qFieldName].enterPress(bodyCell);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onEscPress = function(bodyCell) {
    var self = this;
    self.gridColumns[bodyCell.qFieldName].escPress(bodyCell);
};


////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.selectBodyCell = function(bodyCell) {
    var self = this;
    self.unselectBodyCellIfSelected();
    bodyCell.classList.add('active');
    self.selectedBodyCell   = bodyCell;
    self.selectedColumnName = bodyCell.qFieldName;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.unselectBodyCellIfSelected = function() {
    var self = this;
    if (self.selectedBodyCell !== null) {
        self.gridColumns[self.selectedBodyCell.qFieldName].unselected(self.selectedBodyCell);
        self.selectedBodyCell.classList.remove('active');
        self.selectedBodyCell = null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.selectBodyRow = function(bodyRow) {
    var self = this;
    if (self.selectedBodyRow !== null) {
        if (self.selectedBodyRow == bodyRow) {
            return;
        }
        self.unselectBodyCellIfSelected();
        self.unselectBodyRowIfSelected();
    }
    bodyRow.classList.add('active');
    self.selectedBodyRow = bodyRow;
    if (self.selectedBodyCell === null && this.selectedColumnName !== null) {
        var bodyCellToSelect = self.selectedBodyRow.bodyCells[self.selectedColumnName];
        self.selectBodyCell(bodyCellToSelect);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.unselectBodyRowIfSelected = function() {
    var self = this;
    if (self.selectedBodyRow !== null) {
        self.selectedBodyRow.classList.remove('active');
        self.selectedBodyRow = null;
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.saveScroll = function() {
    var self = this;
    self.scrollTop = self.bodyTable.scrollTop;
    //console.log('hide scrollTop: ' + this.scrollTop);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.restoreScroll = function() {
    var self = this;
    self.bodyTable.scrollTop = self.scrollTop;
    //console.log('show scrollTop: ' + this.scrollTop);
};