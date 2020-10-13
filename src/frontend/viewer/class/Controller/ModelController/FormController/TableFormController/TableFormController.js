'use strict';

class TableFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        // this.grid        = null;
        // this.framesCount = null;
        // this.$goto       = null;
    }

    init() {
        super.init();
        this.model.on('refilled', this.listeners.refilled = this.onRefilled.bind(this));
        this.model.on('refresh', this.listeners.refreshed = this.onRefreshed.bind(this));
        this.parent.on('hide', this.listeners.hide = this.onHidePage.bind(this));
        this.parent.on('show', this.listeners.show = this.onShowPage.bind(this));

        /*const gridSelector = `#${this.model.getPage().id}_${this.model.getName()}_GridWidget`;
        this.grid = new DataGridWidget(this.view.querySelector(gridSelector), this);
        this.grid.init();
        this.grid.on('bodyCellDblClick', this.listeners.bodyCellDblClick = this.onGridCellDblClick.bind(this));*/

        /*
        $(this.view).find('button.next').click(this.onNextClick.bind(this));
        $(this.view).find('button.previous').click(this.onPreviousClick.bind(this));
        this.$count = $(this.view).find('span.count');
        this.$goto = $(this.view).find('select.goto');
        this.$goto.change(this.onGotoChange.bind(this));*/
    }
    getGridColumns() {
        return Object.keys(this.model.fields).filter(name => this.model.fields[name].isVisible()).map(name => {
            const field = this.model.fields[name];
            return {
                name : field.getName(),
                title: field.data.caption,
                width: field.data.width !== '0' ? parseInt(field.data.width) : undefined
            };
        });
    }
    getGridRows() {
        return this.model.getDataSource().getRows();
    }
    deinit() {
        // this.grid.off('bodyCellDblClick', this.listeners.bodyCellDblClick);
        // this.grid.deinit();
        this.parent.off('hide', this.listeners.hide);
        this.parent.off('show', this.listeners.show);
        this.model.off('refilled', this.listeners.refilled);
        this.model.off('refresh', this.listeners.refreshed);
        super.deinit();
    }

    /*fill() {
        // console.log('TableFormController.fill', this.model.getFullName());
        super.fill();
        const dataSource = this.model.getDataSource();
        if (dataSource.getLimit()) {
            $(this.view).find('.paging').css('display', 'block');
            this.setCountText();
        }
        this.framesCount = dataSource.getFramesCount();
        if (this.framesCount) {
            for (let i = 1; i <= this.framesCount; i++) {
                const option = $('<option></option>');
                option.val(i);
                option.html(i);
                this.$goto.append(option);
            }
        }
        this.grid.fill();
    }*/

    /*setCountText() {
        const dataSource = this.model.getDataSource();
        const count = `${dataSource.length} of ${dataSource.count}`;
        this.$count.text(count);
    }*/

    /*updateCountAndGoTo() {
        const dataSource = this.model.getDataSource();
        if (dataSource.getLimit()) {
            this.setCountText();
        }
        this.framesCount = dataSource.getFramesCount();
        if (this.framesCount) {
            this.$goto.empty();
            for (let i = 1; i <= this.framesCount; i++) {
                const option = $('<option></option>');
                option.val(i);
                option.html(i);
                this.$goto.append(option);
            }
        }
    }*/

    onRefilled(ea) {
        console.log('TableFormController.onRefilled', this.model.getFullName());
        /*this.grid.clear();
        this.updateCountAndGoTo();
        this.grid.fill();*/
        this.rerender();
    }

    onRefreshed(ea) {
        console.log('TableFormController.onRefreshed', this.model.getFullName());
        // this.updateCountAndGoTo();
        this.rerender();
    }

    onNewClick = async e => {
        await this.new();
    }

    onRefreshClick = async e => {
        console.log('TableFormController.onRefreshClick', this.model.getFullName());
        await this.model.refresh();
        // console.error('refresh error handler:', err.message);
        // alert(err.message);
    }

    onDeleteClick = e => {
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.grid.getSelectedKey());
        if (confirm(this.model.getApp().data.text.form.areYouSure)) {
            const key = this.grid.getSelectedKey();
            if (key !== null) {
                this.model.delete(key);
            }
        }
    }

    onNextClick() {
        const frame = parseInt(this.$goto.val()) + 1;
        if (frame <= this.framesCount) {
            this.$goto.val(frame);
            this.model.frame(frame);
        }
    }

    onPreviousClick() {
        const frame = parseInt(this.$goto.val()) - 1;
        if (frame > 0) {
            this.$goto.val(frame);
            this.model.frame(frame);
        }
    }

    onGotoChange() {
        const frame = parseInt(this.value);
        this.model.frame(frame);
    }

    onGridCellDblClick = async (row) => {
        console.log('TableFormController.onGridCellDblClick', row);
        // const bodyCell = e.bodyCell;
        // const row = bodyCell.bodyRow.dbRow;
        // console.log('row:', row);
        const key = this.model.getDataSource().getRowKey(row);
        // console.log('key:', key);
        switch (this.model.data.editMethod) {
            // case 'table':
            //     this.grid.gridColumns[bodyCell.qFieldName].beginEdit(bodyCell);
            // break;
            case 'form':
                await this.edit(key);
            break;
        }
    }

    onHidePage() {
        // this.grid.saveScroll();
    }

    onShowPage() {
        console.log('TableFormController.onShowPage', this.model.getFullName());
        /*if (!this.grid.isHidden()) {
            this.grid.restoreScroll();
            this.grid.focus();
            // console.log('document.activeElement:', document.activeElement);
        }*/
    }

    async new() {
        if (this.model.data.newRowMode === 'oneclick') {
            const row = {};
            this.model.fillDefaultValues(row);
            this.model.getDataSource().insert(row);
        } else if (this.model.data.newRowMode === 'editform') {
            if (!this.model.data.itemEditPage) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            await this.openPage({
                name   : this.model.data.itemEditPage,
                newMode: true,
                modal  : true
            });
        } else if (this.model.data.newRowMode === 'createform') {
            if (!this.model.data.itemCreatePage) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            await this.openPage({
                name   : this.model.data.itemCreatePage,
                newMode: true
            });
        } else if (this.model.data.newRowMode === 'oneclick editform') {
            if (!this.model.data.itemEditPage) {
                throw new Error(`[${this.model.getFullName()}] itemEditPage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key = await this.model.getDataSource().insert(row);
            await this.openPage({
                name: this.model.data.itemEditPage,
                key : key
            });
        } else if (this.model.data.newRowMode === 'oneclick createform') {
            if (!this.model.data.itemCreatePage) {
                throw new Error(`[${this.model.getFullName()}] itemCreatePage is empty`);
            }
            const row = {};
            this.model.fillDefaultValues(row);
            const key2 = await this.model.getDataSource().insert(row);
            await this.openPage({
                name: this.model.data.itemCreatePage,
                key : key2
            });
        }
    }

    async edit(key) {
        console.log('TableForm.edit', this.model.getFullName(), key);
        if (!this.model.data.itemEditPage) {
            throw new Error(`${this.model.getFullName()}: itemEditPage is empty`);
        }
        try {
            await this.openPage({
                name : this.model.data.itemEditPage,
                key  : key,
                modal: true
            });
        } catch (err) {
            console.error(`${this.model.getFullName()}: edit form error handler:`, err);
            alert(`${this.model.getFullName()}: ${err.message}`);
        }
    }
}
