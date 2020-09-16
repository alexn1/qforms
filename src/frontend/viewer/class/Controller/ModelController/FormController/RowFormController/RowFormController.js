'use strict';

class RowFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        this.fieldViews   = {};
        this.controlViews = {};
    }

    init() {
        super.init();

        // fieldViews
        for (const name in this.model.fields) {
            const view = this.view.querySelector(`#${this.model.getPage().id}_${this.model.getName()}_${name}`);
            if (view === null) {
                continue;
            }
            this.fieldViews[name] = view;
        }

        // controlViews
        for (const name in this.model.controls) {
            const view = this.view.querySelector(`.${this.model.getPage().id}_${this.model.getName()}_${name}`);
            if (view === null) {
                continue;
            }
            this.controlViews[name] = view;
        }

        // listeners
        this.model.getDataSource().on('rowUpdate', this.listeners.rowUpdate = this.onRowUpdate.bind(this));

        // click
        const self = this;
        $(this.view).find('button.saveForm').click(function() {
            self.onSaveClick(this);
        });
        $(this.view).find('button.discardForm').click(function() {
            self.onDiscardClick(this);
        });
        $(this.view).find('button.refreshForm').click(function() {
            self.onRefresh(this);
        });

        // disable buttons
        $(this.view).find('button.saveForm').prop('disabled', !this.model.getPage().isNewMode());
        $(this.view).find('button.discardForm').prop('disabled', !this.model.isChanged());
        $(this.view).find('button.refreshForm').prop('disabled', this.model.getPage().getKey() === null);

        // action click
        for (const name in this.model.data.actions) {
            const action = this.model.data.actions[name];
            $(this.view).find(`li.${action.name}`).click(() => {
                setTimeout(async () => {
                    const result = await this.onActionClick(action, this.model.getRow());
                    if (!result) alert(`no handler for ${action.name}`);
                }, 0);
            });
        }

    }

    deinit() {
        this.model.getDataSource().off('rowUpdate', this.listeners.rowUpdate);
        super.deinit();
    }

    fill() {
        // console.log('RowFormController.fill');
        super.fill();

        const row = this.model.getRow();

        // fields
        for (const name in this.fields) {
            const view = this.fieldViews[name];
            if (view) {
                this.fields[name].fill(row, view);
            }
        }

        // controls
        for (const name in this.controls) {
            const view = this.controlViews[name];
            if (view) {
                this.controls[name].fill(row, view);
            }
        }
    }

    onRowUpdate(e) {
        console.log('RowFormController.onRowUpdate', this.model.getFullName());
        $(this.view).find('button.saveForm').prop('disabled', true);
        $(this.view).find('button.discardForm').prop('disabled', true);
        $(this.view).find('button.refreshForm').prop('disabled', false);
        for (const name in this.fields) {
            const view = this.fieldViews[name];
            if (view) {
                this.fields[name].refill(this.model.getRow(), view);
            }
        }
        this.parent.onFormUpdate(e);
    }

    isValid() {
        let isValid = true;
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view) {
                if (!field.isValid(view)) isValid = false;
            }
        }
        return isValid;
    }

    getFieldValue(name) {
        return this.model.getFieldValue(name);
    }

    updateErrorClasses() {
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view) {
                field.updateErrorClass(view, field.isValid(view));
            }
        }
    }

    async onSaveClick(el) {
        console.log('RowFormController.onSaveClick');
        const valid = this.isValid();
        this.updateErrorClasses();
        if (valid) {
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
        }
    }

    onDiscardClick(el) {
        console.log('RowFormController.onDiscardClick');

        if (this.model.getDataSource().isChanged()) {
            this.model.getDataSource().discard();
        }

        // refill changed fields
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view) {
                field.refill(row, view);
            }
        }

        // ui
        $(this.view).find('button.saveForm').prop('disabled', !this.model.getPage().isNewMode());
        $(this.view).find('button.discardForm').prop('disabled', !this.model.isChanged());
        $(this.view).find('button.refreshForm').prop('disabled', this.model.getPage().getKey() === null);

        // event
        this.parent.onFormDiscard(this);
    }

    onRefresh(el) {
        console.log('RowFormController.onRefresh');
        this.model.refresh();
        // console.log('url data source value:', this.fields.url.model.getValue(this.model.getRow()));
        // console.log('this.model.getDataSource().data.rows[0].url:', this.model.getDataSource().data.rows[0].url);

    }

    isChanged() {
        if (this.model.isChanged()) return true;
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (field.isChanged(row, view)) return true;
        }
        return false;
    }

    onFieldChange(e) {
        console.log('RowFormController.onFieldChange', this.model.getFullName());
        const changed = this.isChanged();
        const hasNew = this.model.hasNew();
        console.log('changed:', changed);
        console.log('hasNew:', hasNew);
        if (changed || hasNew) {
            if (this.isValid()) {
                $(this.view).find('button.saveForm').prop('disabled', !(this.isChanged() || this.model.hasNew()));
            } else {
                $(this.view).find('button.saveForm').prop('disabled', true);
            }
        } else {
            $(this.view).find('button.saveForm').prop('disabled', true);
        }
        $(this.view).find('button.discardForm').prop('disabled', !changed);
        $(this.view).find('button.refreshForm').prop('disabled', changed || this.model.hasNew());
        super.onFieldChange(e);
    }

    async onActionClick(action, row) {
        console.log('RowFormController.onActionClick', action, row);
    }
}
