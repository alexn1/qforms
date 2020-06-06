'use strict';

class GridColumn {
    constructor(gridWidget, name, headerCell) {
        this.gridWidget = gridWidget;
        this.name       = name;
        this.headerCell = headerCell;
        this.viewClass  = null;
    }

    init() {
        this.viewClass  = $(this.headerCell).data('view-class');        // name of view css class
        this.initResize(this.headerCell, this.name);
    }

    deinit() {
    }

    initResize(headerCell, fieldName) {
        const self = this;
        const resize = headerCell.querySelector('td > span');
        resize.qFieldName = fieldName;
        resize.addEventListener('mousedown', function(event) {return self.beginResize(event, this);});
        resize.addEventListener('dblclick', function(event) {return self.setOptimalWidth(event, this);});
    }

    renderView() {
        const $view = $('<div><span></span></div>');
        if (this.viewClass) {
            $view.addClass(this.viewClass);
        }
        return $view.get(0);
    }

    setViewStyle(view, row) {
    }

    setValue(view, value) {
        view.firstElementChild.innerHTML = value;
    }

    getValue(view) {
        return view.firstElementChild.innerHTML;
    }

    getOptimalWidth(view) {
        return view.firstElementChild.offsetWidth;
    }

    beginResize(e, resize) {
        //console.log('onmousedown');
        const bodyTable = this.gridWidget.el.querySelector('.body > table');
        const headTd = resize.parentElement;
        headTd.originX = e.clientX;
        headTd.originWidth = headTd.offsetWidth;
        if (bodyTable.rows[0]) var bodyTd = bodyTable.rows[0].cells[headTd.cellIndex];
        document.onmousemove = (e) => {
            const offset = e.clientX - headTd.originX;
            let width = headTd.originWidth + offset;
            if (width < 10) {
                width = 10;
            }
            headTd.style.width = width + 'px';
            if (bodyTd) bodyTd.style.width = width + 'px';
            return false;
        };
        document.onmouseup = (e) => {
            //console.log('onmouseup');
            document.onmousemove = null;
            document.onmouseup = null;
            return false;
        };
        return false;
    }

    setOptimalWidth(e, resize) {
        const bodyTable = this.gridWidget.el.querySelector('.body > table');
        const headTd = resize.parentElement;
        if (bodyTable.rows[0]) var bodyTd = bodyTable.rows[0].cells[headTd.cellIndex];
        let maxWidth = 0;
        for (let i = 0; i < this.gridWidget.bodyTable.children.length; i++) {
            const bodyRow = this.gridWidget.bodyTable.children[i];
            let width = this.gridWidget.gridColumns[resize.qFieldName].getOptimalWidth(bodyRow.bodyCells[resize.qFieldName].firstElementChild);
            if (width > maxWidth) maxWidth = width;
        }
        //console.log(resize.qFieldName + ': ' + maxWidth);
        if (maxWidth !== 0) {
            maxWidth += 11;
            headTd.style.width = maxWidth + 'px';
            if (bodyTd) {
                bodyTd.style.width = maxWidth + 'px';
            }
        }
        return false;
    }

    unselected(bodyCell) {
        if (bodyCell.isEdited) {
            window.getSelection().removeAllRanges();
            this.restoreValue(bodyCell);
            this.endEdit(bodyCell);
        }
    }

    enterPress(bodyCell) {
        if (bodyCell.isEdited) {
            if (bodyCell.oldValue !== this.getValue(bodyCell.firstElementChild)) {
                this.gridWidget.save(bodyCell);
            }
            this.endEdit(bodyCell);
            bodyCell.classList.add('active');
        }
    }

    escPress(bodyCell) {
        if (bodyCell.isEdited) {
            this.restoreValue(bodyCell);
            this.endEdit(bodyCell);
            bodyCell.classList.add('active');
        }
    }

    beginEdit(bodyCell) {
        bodyCell.isEdited = true;
        bodyCell.classList.remove('active');
        bodyCell.classList.add('edit');
        bodyCell.oldValue = this.getValue(bodyCell.firstElementChild);
    }

    endEdit(bodyCell) {
        bodyCell.oldValue = null;
        bodyCell.isEdited = false;
        bodyCell.classList.remove('edit');
    }

    restoreValue(bodyCell) {
        this.setValue(bodyCell.firstElementChild, bodyCell.oldValue);
    }

}
