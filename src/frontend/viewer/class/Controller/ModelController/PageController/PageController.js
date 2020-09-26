'use strict';

class PageController extends ModelController {

    static create(model, view, parent) {
        // console.log('PageController.create', model.getName());
        if (model.data.js) {
            const CustomClass = eval(model.data.js);
            if (!CustomClass) throw new Error(`custom class of "${model.getFullName()}" form does not return type`);
            return new CustomClass(model, view, parent);
        }
        return eval(`new ${model.data.class}Controller(model, view, parent)`);
    }

    constructor(model, view, parent) {
        //console.log('PageController.constructor', model);
        super(model);
        this.view       = view;
        this.parent     = parent;
        this.forms      = {};
        this.tab        = null;
    }

    init() {
        const self = this;
        $(this.view).find(`#${this.model.id}_TabWidget`).each(function() {
            new TabWidget(this).init();
        });

        // disable buttons
        $(this.view).find('button.saveAndClose').prop('disabled', !this.model.hasNew());

        // button click
        $(this.view).find('button.saveAndClose').click(this.onSaveAndCloseClick.bind(this));
        $(this.view).find('button.closePage').click(this.onClosePageClick.bind(this));

        // forms
        for (const name in this.model.forms) {
            const form = this.model.forms[name];
            const viewId = `#${this.model.id}_${name}`;
            const view = $(this.view).find(viewId).get(0);
            this.forms[name] = FormController.create(form, view, this);
            this.forms[name].init();
        }
    }

    getCaptionElements() {
        return this.view.querySelectorAll(`.caption`);
    }

    deinit() {
        console.log('PageController.deinit: ' + this.model.getFullName());
        for (const name in this.forms) {
            this.forms[name].deinit();
        }
        super.deinit();
    }

    fill() {
        for (const name in this.forms) {
            this.forms[name].fill();
        }
        this.setCaption(this.getCaption());
    }

    async onSaveAndCloseClick() {
        console.log('PageController.onSaveAndCloseClick');
        if (this.isValid()) {
            await this.model.update();
            console.log('page model updated', this.model.getFullName());
            this.getApplicationController().closePage(this);
        } else {
            for (const name in this.forms) {
                const form = this.forms[name];
                if (form.model.getClassName() === 'RowForm') {
                    form.updateErrorClasses();
                }
            }
        }
    }

    onClosePageClick() {
        // console.log('PageController.onClosePageClick', this.model.getFullName());
        this.close();
    }

    close() {
        console.log('PageController.close', this.model.getFullName());
        const changed = this.isChanged();
        console.log('changed:', changed);
        const valid = this.isValid();
        console.log('valid:', valid);
        if (changed/* || !valid*/) {
            const result = confirm(this.model.getApp().data.text.form.areYouSure);
            if (!result) return;
        }
        this.getApplicationController().closePage(this);
    }

    enableSave() {
        $(this.view).find('button.saveAndClose').prop('disabled', false);
    }

    disableSave() {
        $(this.view).find('button.saveAndClose').prop('disabled', true);
    }

    setCaption(caption) {
        this.getCaptionElements().forEach(el => el.innerHTML = caption);
        if (this.tab) {
            TabWidget.setTabCaption(this.tab, caption);
        }
    }

    getCaption() {
        // console.log('PageController.getCaption', this.model.getFullName());
        const key = this.model.getKey();
        let caption = this.model.data.caption;
        if (ApplicationController.isInDebugMode()) {
            caption += `(${this.model.id})`;
        }
        if (key) {
            caption += ` ${key}`;
        }
        if (this.isChanged() || this.model.hasNew()) {
            caption += ' <span class="star">*</span>';
        }
        return caption;
    }

    isValid() {
        console.log('PageController.isValid', this.model.getFullName());
        let isValid = true;
        for (const name in this.forms) {
            if (!this.forms[name].isValid()) {
                isValid = false;
            }
        }
        return isValid;
    }

    onFormChange(e) {
        console.log('PageController.onFormChange', this.model.getFullName());
        this.setCaption(this.getCaption());
        if (this.isChanged() || this.model.hasNew()) {
            if (this.isValid()) {
                this.enableSave();
            } else {
                this.disableSave();
            }
        } else {
            this.disableSave();
        }
    }

    onFormDiscard(formController) {
        console.log('PageController.onFormDiscard', this.model.getFullName());
        this.setCaption(this.getCaption());
        if (this.isChanged() || this.model.hasNew()) {
            this.enableSave();
        } else {
            this.disableSave();
        }
    }

    onFormUpdate(e) {
        console.log('PageController.onFormUpdate:', this.model.getFullName());
        this.setCaption(this.getCaption());
        this.disableSave();
    }

    async openPage(options) {
        options.parentPage = this.model;
        return await this.getApplicationController().openPage(options);
    }

    isChanged() {
        console.log('PageController.isChanged', this.model.getFullName());
        for (const name in this.forms) {
            const form = this.forms[name];
            if (form.isChanged()) {
                // console.log(`FORM CHANGED: ${form.model.getFullName()}`);
                return true;
            }
        }
        return false;
    }

    getApplicationController() {
        return this.parent;
    }
}
