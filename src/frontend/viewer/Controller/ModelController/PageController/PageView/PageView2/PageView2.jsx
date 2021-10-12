class PageView2 extends PageView {
    getCssBlockName() {
        return 'PageView';
    }
    renderTableForms() {
        const ctrl = this.getCtrl();
        const tableForms = ctrl.forms.filter(form => form.getModel().getClassName() === 'TableForm');
        if (tableForms.length === 1) {
            return this.renderForm(tableForms[0]);
        } else {
            return <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
                <div className="frame__container">
                    <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                </div>
            </div>;
        }
    }
}
