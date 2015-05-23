"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    $("div[data-class='GridWidget']").each(function() {
        this._obj = new GridWidget(this);
        this._obj.init();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
function GridWidget(el) {
    this.el = el;
    this.gridColumns = {};
    this.bodyTable = null;
    this.selectedBodyRow = null;
    this.selectedBodyCell = null;
    this.selectedColumnName = null; // имя поля выделенной колонки
    this.scrollTop = 0;
    this.eventBodyCellDblClick = new QForms.Event(this);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.init = function() {
    var self = this;
    var bodyDiv = document.createElement("div");
    bodyDiv.className = "body";
    bodyDiv.addEventListener("scroll",function() {
        self.onBodyScroll(this);
    });
    var table = document.createElement("table");
    bodyDiv.appendChild(table);
    this.el.appendChild(bodyDiv);
    this.bodyTable = table;
    $(this.el).children("div.head").children("table").children("tbody").children("tr").children("td").each(function() {
        var columnName = $(this).attr('data-column-name');
        if (columnName !== undefined) {
            self.gridColumns[columnName] = self.createColumn(columnName,this);
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.deinit = function() {
    for (var columnName in this.gridColumns) {
        this.gridColumns[columnName].deinit();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyScroll = function(el) {
    el.parentElement.querySelector('.head').scrollLeft = el.scrollLeft;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createColumn = function(fieldName,headerCell) {
    var gridColumn = new GridColumn(this,fieldName,headerCell);
    gridColumn.init();
    return gridColumn;
}



////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createBodyRow = function(i) {
    var bodyRow = document.createElement("tr");
    bodyRow.qI = i;
    bodyRow.bodyCells = {};
    for (var columnName in this.gridColumns) {
        var bodyCell = this.createBodyCell(columnName);
        bodyCell.bodyRow = bodyRow;
        bodyRow.appendChild(bodyCell);
        bodyRow.bodyCells[columnName] = bodyCell;
    }
    bodyRow.appendChild(document.createElement("td"));
    QForms.insertNewNodeAt(this.bodyTable,bodyRow,i);
    return bodyRow;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.createBodyCell = function(name) {
    var self = this;
    var view = this.gridColumns[name].getView();
    // bodyCell
    var bodyCell = window.document.createElement("td");
    bodyCell.style.width = this.gridColumns[name].headerCell.style.width;
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
    /*
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
    }
    */
    return bodyCell;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyCellMouseDown = function(bodyCell) {
    // если кликнули по выделенной, то ничего не делаем
    if (this.selectedBodyCell && this.selectedBodyCell === bodyCell) {
        return;
    }
    this.selectBodyRow(bodyCell.bodyRow);
    this.selectBodyCell(bodyCell);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onBodyCellDblClick = function(bodyCell) {
    var ea = new QForms.EventArg(this);
    ea.bodyCell = bodyCell;
    this.eventBodyCellDblClick.fire(ea);
}

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onEnterPress = function(bodyCell) {
    this.gridColumns[bodyCell.qFieldName].enterPress(bodyCell);
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.onEscPress = function(bodyCell) {
    this.gridColumns[bodyCell.qFieldName].escPress(bodyCell);
}
*/

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.selectBodyCell = function(bodyCell) {
    this.unselectBodyCellIfSelected();
    bodyCell.classList.add("active");
    this.selectedBodyCell = bodyCell;
    this.selectedColumnName = bodyCell.qFieldName;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.unselectBodyCellIfSelected = function() {
    if (this.selectedBodyCell !== null) {
        //this.gridColumns[this.selectedBodyCell.qFieldName].unselected(this.selectedBodyCell);
        this.selectedBodyCell.classList.remove("active");
        this.selectedBodyCell = null;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.selectBodyRow = function(bodyRow) {
    if (this.selectedBodyRow !== null) {
        if (this.selectedBodyRow == bodyRow) {
            return;
        }
        this.unselectBodyCellIfSelected();
        this.unselectBodyRowIfSelected();
    }
    bodyRow.classList.add("active");
    this.selectedBodyRow = bodyRow;
    if (this.selectedBodyCell === null && this.selectedColumnName !== null) {
        var bodyCellToSelect = this.selectedBodyRow.bodyCells[this.selectedColumnName];
        this.selectBodyCell(bodyCellToSelect);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.unselectBodyRowIfSelected = function() {
    if (this.selectedBodyRow !== null) {
        this.selectedBodyRow.classList.remove("active");
        this.selectedBodyRow = null;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.saveScroll = function() {
    this.scrollTop = this.bodyTable.scrollTop;
    //console.log("hide scrollTop: " + this.scrollTop);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridWidget.prototype.restoreScroll = function() {
    this.bodyTable.scrollTop = this.scrollTop;
    //console.log("show scrollTop: " + this.scrollTop);
}