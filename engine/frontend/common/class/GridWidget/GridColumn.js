"use strict"

////////////////////////////////////////////////////////////////////////////////////////////////////
function GridColumn(gridWidget,name,headerCell) {
    this.gridWidget = gridWidget;
    this.name = name;
    this.headerCell = headerCell;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.init = function() {
    this.initResize(this.headerCell,this.name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.deinit = function() {
}


////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.initResize = function(headerCell,fieldName) {
    var self = this;
    var resize = headerCell.querySelector("td > span");
    resize.qFieldName = fieldName;
    resize.addEventListener("mousedown",function(event) {return self.beginResize(event,this);});
    resize.addEventListener("dblclick",function(event) {return self.setOptimalWidth(event,this);});
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.getView = function() {
    return $('<div><span></span></div>').get(0);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.setViewStyle = function(view,row) {

}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.setValue = function(view,value) {
    view.firstElementChild.innerHTML = value;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.getValue = function(view) {
    return view.firstElementChild.innerHTML;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.getOptimalWidth = function(view) {
    return view.firstElementChild.offsetWidth;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.beginResize = function(e,resize) {
    //console.log("onmousedown");
    var bodyTable = this.gridWidget.el.querySelector(".body > table");
    var headTd = resize.parentElement;
    headTd.originX = e.clientX;
    headTd.originWidth = headTd.offsetWidth;
    if (bodyTable.rows[0]) var bodyTd = bodyTable.rows[0].cells[headTd.cellIndex];
    document.onmousemove = function (e) {
        var offset = e.clientX - headTd.originX;
        var width = headTd.originWidth + offset;
        if (width < 10) {
            width = 10;
        }
        headTd.style.width = width + "px";
        if (bodyTd) bodyTd.style.width = width + "px";
        return false;
    };
    document.onmouseup = function (e) {
        //console.log("onmouseup");
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
    };
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.setOptimalWidth = function(e,resize) {
    var bodyTable = this.gridWidget.el.querySelector(".body > table");
    var headTd = resize.parentElement;
    if (bodyTable.rows[0]) var bodyTd = bodyTable.rows[0].cells[headTd.cellIndex];
    var maxWidth = 0;
    for (var i=0;i<this.gridWidget.bodyTable.children.length;i++) {
        var bodyRow = this.gridWidget.bodyTable.children[i];
        var width = this.gridWidget.gridColumns[resize.qFieldName].getOptimalWidth(bodyRow.bodyCells[resize.qFieldName].firstElementChild);
        if (width > maxWidth) maxWidth = width;
    }
    //console.log(resize.qFieldName + ": " + maxWidth);
    if (maxWidth !== 0) {
        maxWidth += 11;
        headTd.style.width = maxWidth + "px";
        if (bodyTd) bodyTd.style.width = maxWidth + "px";
    }
    return false;
}


/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.focus = function(bodyCell) {
    bodyCell.firstElementChild.firstElementChild.focus();
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.unselected = function(bodyCell) {
    if (bodyCell.isEdited) { // если редактировалась, то отменяем редактирование
        window.getSelection().removeAllRanges();
        this.restoreValue(bodyCell);
        this.endEdit(bodyCell);
    }
}
*/


/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.doubleClick = function(bodyCell) {
    this.beginEdit(bodyCell);
    this.focus(bodyCell);
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.enterPress = function(bodyCell) {
    if (bodyCell.isEdited) {
        if (bodyCell.oldValue !== this.getValue(bodyCell.firstElementChild)) {
            this.gridWidget.save(bodyCell);
        }
        this.endEdit(bodyCell);
    }
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.escPress = function(bodyCell) {
    if (bodyCell.isEdited) {
        this.restoreValue(bodyCell);
        this.endEdit(bodyCell);
    }
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.beginEdit = function(bodyCell) {
    bodyCell.classList.add("edit");
    bodyCell.oldValue = this.getValue(bodyCell.firstElementChild);
    bodyCell.firstElementChild.firstElementChild.style.MozUserSelect = "text";
    bodyCell.firstElementChild.firstElementChild.contentEditable = true;
    this.selectContent(bodyCell);
    bodyCell.isEdited = true;
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.endEdit = function(bodyCell) {
    bodyCell.firstElementChild.firstElementChild.style.MozUserSelect = "none";
    bodyCell.firstElementChild.firstElementChild.contentEditable = false;
    bodyCell.oldValue = null;
    bodyCell.isEdited = false;
    bodyCell.classList.remove("edit");
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.selectContent = function(bodyCell) {
    var range = document.createRange();
    range.selectNodeContents(bodyCell.firstElementChild.firstElementChild);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
}
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
GridColumn.prototype.restoreValue = function(bodyCell) {
    this.setValue(bodyCell,bodyCell.oldValue);
}
*/