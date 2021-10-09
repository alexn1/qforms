class PageView2 extends PageView {
    getCssBlockName() {
        return 'PageView';
    }
    getAllTabs() {
        const ctrl = this.props.ctrl;
        return ctrl.forms.map(form => {
            return {
                name   : form.model.getName(),
                title  : form.getTitle(),
                content: this.renderForm(form)
            };
        });
    }
    render() {
        console.log('PageView2.render', this.props.ctrl.model.getFullName());
        return (
            <div className={`${this.getCssBlockName()} full frame`}>
                <div className={'frame__container flex-rows'}>
                    {this.renderCaption()}
                    {/*(model.hasRowFormWithDefaultDs() || model.hasActions()) &&*/ this.renderToolbar()}
                    <div className={`${this.getCssBlockName()}__table-forms flex-max frame`}>
                        <div className={'frame__container'}>
                            <Tab tabs={this.getAllTabs()} classList={['Tab-blue', 'full']}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

window.QForms.PageView2 = PageView2;