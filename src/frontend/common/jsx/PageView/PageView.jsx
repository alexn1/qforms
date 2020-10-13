class PageView extends ReactComponent {
    getTabs() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'TableForm').map(name => {
            const form = model.forms[name];
            return {
                name: form.getName(),
                title: form.data.caption,
                content: <TableFormView key={name} ctrl={ctrl.forms[name]}/>
            };
        });
    }
    getRowForms() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'RowForm').map(name => {
            const formController = ctrl.forms[name];
            return <RowFormView key={name} ctrl={formController}/>;
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return (
            <div className={`PageView full place ${model.getName()}`}>
                <div className="frame flex-rows">
                    <h3 className="caption flex-min">{model.data.caption}</h3>
                    {model.hasRowFormWithDefaultDs() &&
                        <Toolbar3 ctrl={ctrl}/>
                    }
                    {model.hasRowForm() && this.getRowForms()}
                    {model.hasTableFormOrTreeForm() &&
                    [<div key="one" className="table-forms flex-max place">
                        <div className="frame">
                            <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                        </div>
                    </div>, <div key="two" className="splitter flex-min"></div>]
                    }
                </div>
            </div>
        );
    }
}
