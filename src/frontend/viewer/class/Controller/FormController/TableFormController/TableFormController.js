'use strict';

class TableFormController extends FormController {
    constructor(model, parent) {
        super(model, parent);
        // this.framesCount = null;
        // this.$goto       = null;
        this.state = {
            updated     : Date.now(),
            activeRowKey: null
        };
    }

    init() {
        super.init();
        // this.model.on('refilled', this.listeners.refilled = this.onRefilled.bind(this));
        // this.model.on('refresh', this.listeners.refreshed = this.onRefreshed.bind(this));
        // this.parent.on('hide', this.listeners.hide = this.onHidePage.bind(this));
        // this.parent.on('show', this.listeners.show = this.onShowPage.bind(this));

        // data source events
        const dataSource = this.model.getDataSource();
        dataSource.on('refresh', this.listeners.refresh = this.onDataSourceRefresh);
        dataSource.on('update' , this.listeners.update  = this.onDataSourceUpdate);
        dataSource.on('delete' , this.listeners.delete  = this.onDataSourceDelete);

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
                title: field.getCaption(),
                width: field.getWidth()
            };
        });
    }
    getGridRows() {
        return this.model.getDataSource().getRows();
    }
    deinit() {
        // this.grid.off('bodyCellDblClick', this.listeners.bodyCellDblClick);
        // this.grid.deinit();
        // this.parent.off('hide', this.listeners.hide);
        // this.parent.off('show', this.listeners.show);
        // this.model.off('refilled', this.listeners.refilled);
        // this.model.off('refresh', this.listeners.refreshed);

        // data source events
        const dataSource = this.model.getDataSource();
        dataSource.off('refresh', this.listeners.refresh);
        dataSource.off('update' , this.listeners.update);
        dataSource.off('delete' , this.listeners.delete);

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

    /*onRefilled(ea) {
        console.log('TableFormController.onRefilled', this.model.getFullName());
        this.grid.clear();
        this.updateCountAndGoTo();
        this.grid.fill();
        this.rerender();
    }*/

    /*onRefreshed(ea) {
        console.log('TableFormController.onRefreshed', this.model.getFullName());
        this.updateCountAndGoTo();
        this.rerender();
    }*/

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
        console.log('TableFormController.onDeleteClick', this.model.getFullName(), this.state.activeRowKey);
        if (confirm(this.model.getApp().getText().form.areYouSure)) {
            this.model.getDataSource().delete(this.state.activeRowKey);
        }
    }

    onNextClick = () => {
        console.log('TableFormController.onNextClick');
        /*const frame = parseInt(this.$goto.val()) + 1;
        if (frame <= this.framesCount) {
            this.$goto.val(frame);
            this.model.frame(frame);
        }*/
    }

    onPreviousClick = () => {
        console.log('TableFormController.onPreviousClick');
        /*const frame = parseInt(this.$goto.val()) - 1;
        if (frame > 0) {
            this.$goto.val(frame);
            this.model.frame(frame);
        }*/
    }

    onGotoChange() {
        const frame = parseInt(this.value);
        this.model.frame(frame);
    }

    onGridCellDblClick = async (row) => {
        // console.log('TableFormController.onGridCellDblClick', row);
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
    onDataSourceRefresh = e => {
        console.log('TableFormController.onDataSourceRefresh', this.model.getFullName(), e);
        this.invalidate();
        this.rerender();
    }
    onDataSourceUpdate = e => {
        console.log('TableFormController.onDataSourceUpdate', this.model.getFullName(), e.key);
        this.invalidate();
        this.rerender();
    }
    onDataSourceDelete = e => {
        console.log('TableFormController.onDataSourceDelete', this.model.getFullName(), e.key);
        if (this.state.activeRowKey === e.key) {
            this.state.activeRowKey = null;
        }
        this.invalidate();
        this.rerender();
    }
    onActiveRowChanged = i => {
        // console.log('TableFormController.onActiveRowChanged', i);
        const rows = this.model.getDataSource().getRows();
        this.state.activeRowKey = this.model.getDataSource().getRowKey(rows[i]);
    }
    getActiveRow = () => {
        // console.log('TableFormController.getActiveRow', this.state.activeRowKey);
        if (this.state.activeRowKey) {
            const row = this.model.getDataSource().getRowByKey(this.state.activeRowKey);
            const rows = this.model.getDataSource().getRows();
            if (!row) {
                console.log('rows:', rows);
                throw new Error(`no row with key: ${this.state.activeRowKey}`);
            }
            const i = rows.indexOf(row);
            if (i === -1) {
                throw new Error('cannot find active row')
            }
            return i;
        }
        return null;
    }
    isRowSelected = () => {
        // console.log('TableFormController.isRowSelected');
        return this.state.activeRowKey !== null;
    }
    onFrameChanged = value => {
        console.log('TableFormController.onFrameChanged', value);
    }
}
