class PageView extends ReactComponent {
    getTabs() {
        const ctrl = this.props.ctrl;
        const model = ctrl.model;
        return Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'TableForm').map(name => {
            const form = model.forms[name];
            return {
                name: form.getName(),
                title: form.data.caption,
                content: <TableFormView ctrl={ctrl.forms[name]}/>
            };
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
                    {model.hasRowForm() && Object.keys(model.forms).filter(name => model.forms[name].getClassName() === 'RowForm').map(name => {
                        const formController = ctrl.forms[name];
                        return <RowFormView key={name} ctrl={formController}/>;
                    })}
                    {model.isThereATableFormOrTreeForm() &&
                    [<div className="table-forms flex-max place">
                        <div className="frame">
                            <Tab tabs={this.getTabs()} classList={['Tab-blue', 'full']}/>
                        </div>
                    </div>, <div className="splitter flex-min"></div>]
                    }
                </div>
            </div>
        );
    }
}
