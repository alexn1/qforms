'use strict';

class RowFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        this.fieldViews   = {};
        this.controlViews = {};
        this.saveFormButton = null;
        this.discardFormButton = null;
        this.actionButton = null;
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
        // $(this.view).find('button[name="saveForm"]').click(this.onSaveClick.bind(this));
        // $(this.view).find('button.discardForm').click(this.onDiscardClick.bind(this));
        $(this.view).find('button.refreshForm').click(this.onRefresh.bind(this));

        // disable buttons
        // $(this.view).find('button.saveForm').prop('disabled', !this.model.getPage().hasNew());
        // $(this.view).find('button.discardForm').prop('disabled', !this.model.isChanged());
        $(this.view).find('button.refreshForm').prop('disabled', this.model.getPage().getKey() === null);

        // actions
        if (Object.keys(this.model.data.actions).length > 0) {
            const actions = Object.keys(this.model.data.actions).map(name => {
                const action = this.model.data.actions[name];
                return {
                    name: action.name,
                    title: action.caption
                };
            });
            this.actionButton = ApplicationController.createReactComponent(this.view.querySelector('.actions'), DropdownButton, {
                actions,
                onClick: async li => {
                    // console.log('li:', li);
                    const action = this.model.data.actions[li.dataset.action];
                    const result = await this.onActionClick(action, this.model.getRow());
                    if (!result) alert(`no handler for ${action.name}`);
                }
            });
        }

        // saveFormButton
        this.saveFormButton = ApplicationController.createReactComponent(this.view.querySelector('div.saveFormButton'), Button, {
            name: 'saveFormButton',
            title: 'Save',
            onClick: this.onSaveClick.bind(this)
        });
        this.saveFormButton.setDisabled(!this.model.getPage().hasNew());

        // discardFormButton
        this.discardFormButton = ApplicationController.createReactComponent(this.view.querySelector('div.discardFormButton'), Button, {
            name: 'discardFormButton',
            title: 'Discard',
            onClick: this.onDiscardClick.bind(this)
        });
        this.discardFormButton.setDisabled(!this.model.isChanged());


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
        console.log('RowFormController.onRowUpdate', this.model.getFullName(), e);
        // $(this.view).find('button.saveForm').prop('disabled', true);
        this.saveFormButton.setDisabled(true);
        // $(this.view).find('button.discardForm').prop('disabled', true);
        this.discardFormButton.setDisabled(true);
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
        console.log('RowFormController.isValid', this.model.getFullName());
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

    async onSaveClick() {
        console.log('RowFormController.onSaveClick');
        const valid = this.isValid();
        this.updateErrorClasses();
        if (valid) {
            await this.model.update();
        } else {
            console.error(`cannot update invalid row form: ${this.model.getFullName()}`);
        }
    }

    onDiscardClick() {
        console.log('RowFormController.onDiscardClick', this.model.getFullName());
        const changedFields = [];
        const row = this.model.getRow();
        for (const name in this.fields) {
            const field = this.fields[name];
            const view = this.fieldViews[name];
            if (view && field.isChanged(row, view)) {
                changedFields.push(field);
            }
        }

        if (this.model.getDataSource().isChanged()) {
            this.model.getDataSource().discard();
        }

        // refill changed fields
        changedFields.forEach(field => {
            const name = field.model.getName();
            const view = this.fieldViews[name];
            field.refill(row, view);
        });

        // ui
        // $(this.view).find('button.saveForm').prop('disabled', !this.model.getPage().hasNew());
        this.saveFormButton.setDisabled(!this.model.getPage().hasNew());
        // $(this.view).find('button.discardForm').prop('disabled', !this.model.isChanged());
        this.discardFormButton.setDisabled(!this.model.isChanged());
        $(this.view).find('button.refreshForm').prop('disabled', this.model.getPage().getKey() === null);

        // event
        this.parent.onFormDiscard(this);
    }

    onRefresh() {
        console.log('RowFormController.onRefresh', this.model.getFullName());
        this.model.refresh();
    }

    isChanged() {
        console.log('RowFormController.isChanged', this.model.getFullName());
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
        // console.log('changed:', changed);
        // console.log('hasNew:', hasNew);
        if (changed || hasNew) {
            if (this.isValid()) {
                // $(this.view).find('button.saveForm').prop('disabled', !(changed || this.model.hasNew()));
                this.saveFormButton.setDisabled(!(changed || this.model.hasNew()));
            } else {
                // $(this.view).find('button.saveForm').prop('disabled', true);
                this.saveFormButton.setDisabled(true);
            }
        } else {
            // $(this.view).find('button.saveForm').prop('disabled', true);
            this.saveFormButton.setDisabled(true);
        }
        // $(this.view).find('button.discardForm').prop('disabled', !changed);
        this.discardFormButton.setDisabled(!changed);
        $(this.view).find('button.refreshForm').prop('disabled', changed || this.model.hasNew());
        super.onFieldChange(e);
    }

    async onActionClick(action, row) {
        console.log('RowFormController.onActionClick', action, row);
    }
}
