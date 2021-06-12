class PageView2 extends PageView {
    getAllTabs() {
        const ctrl = this.props.ctrl;
        return ctrl.forms.map(form => {
            return {
                name   : form.model.getName(),
                title  : form.model.getCaption(),
                content: PageView.renderForm(form)
            };
        });
    }
    render() {
        console.log('PageView2.render', this.props.ctrl.model.getFullName());
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className="PageView full frame">
                <div className="frame__content flex-rows">
                    <h3 className="PageView__caption">{this.renderCaption()}</h3>
                    {(model.hasRowFormWithDefaultDs() || model.hasActions()) && this.renderToolbar()}
                    <div className="PageView__table-forms flex-max frame">
                        <div className="frame__content">
                            <Tab tabs={this.getAllTabs()} classList={['Tab-blue', 'full']}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
window.QForms.PageView2 = PageView2;
