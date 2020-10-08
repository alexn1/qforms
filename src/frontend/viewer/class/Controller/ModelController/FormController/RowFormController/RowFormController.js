'use strict';

class RowFormController extends FormController {
    constructor(model, view, parent) {
        super(model, view, parent);
        this.fieldViews   = {};
        this.controlViews = {};
        this.saveFormButton = null;
        this.discardFormButton = null;
        this.refreshFormButton = null;
        this.actionButton = null;
        this.state = {};
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

        this.state.saveFormButton    = this.model.getPage().hasNew();
        this.state.discardFormButton = this.model.isChanged();
        this.state.refreshFormButton = this.model.getPage().getKey() !== null;

        // saveFormButton
        this.saveFormButton = ApplicationController.createReactComponent(this.view.querySelector('div.saveFormButton'), Button, {
            name: 'saveFormButton',
            title: 'Save',
            onClick: this.onSaveClick.bind(this),
            isDisabled: this.buttonIsDisabled.bind(this)
        });

        // discardFormButton
        this.discardFormButton = ApplicationController.createReactComponent(this.view.querySelector('div.discardFormButton'), Button, {
            name: 'discardFormButton',
            title: 'Discard',
            onClick: this.onDiscardClick.bind(this),
            isDisabled: this.buttonIsDisabled.bind(this)
        });

        // refreshFormButton
        this.refreshFormButton = ApplicationController.createReactComponent(this.view.querySelector('div.refreshFormButton'), Button, {
            name: 'refreshFormButton',
            title: 'Refresh',
            onClick: this.onRefresh.bind(this),
            isDisabled: this.buttonIsDisabled.bind(this)
        });
    }

    buttonIsDisabled(name) {
        console.log('RowFormController.buttonIsDisabled', name);
        return !this.state[name];
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

    rerenderToolbar() {
        this.saveFormButton.rerender();
        this.discardFormButton.rerender();
        this.refreshFormButton.rerender();
    }

    onRowUpdate(e) {
        console.log('RowFormController.onRowUpdate', this.model.getFullName(), e);
        this.state.saveFormButton = false;
        this.state.discardFormButton = false;
        this.state.refreshFormButton = true;
        this.rerenderToolbar();


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
        this.state.saveFormButton    = this.model.getPage().hasNew();
        this.state.discardFormButton = this.model.isChanged();
        this.state.refreshFormButton = this.model.getPage().getKey() !== null;
        this.rerenderToolbar();

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
                this.state.saveFormButton = changed || hasNew;
            } else {
                this.state.saveFormButton = false;
            }
        } else {
            this.state.saveFormButton = false;
        }
        this.state.discardFormButton = changed;
        this.state.refreshFormButton = !(changed || hasNew);
        this.rerenderToolbar();
        super.onFieldChange(e);
    }

    async onActionClick(action, row) {
        console.log('RowFormController.onActionClick', action, row);
    }
}
