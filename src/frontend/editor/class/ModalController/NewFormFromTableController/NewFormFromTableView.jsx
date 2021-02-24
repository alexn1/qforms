class NewFormFromTableView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        const tableController = ctrl.options.tableController;
        const pages = tableController.model.parent.parent.pageLinks.map(pageLink => ({value: pageLink.getName(), title: pageLink.getName()}))
        console.log('pages:', pages);
        return <div className="modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Form</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="formTable">Table</label>
                    <TextBox id="formTable" classList={['form-control']} disabled={true} value={tableController.model.getName()}/>
                </div>
                <div className="form-group">
                    <label htmlFor="formPage">Page</label>
                    <ComboBox id="formPage" classList={['form-control']} items={pages} value={pages[pages.length-1].value}/>
            </div>
            <div className="form-group">
                <label htmlFor="formClass">Form Class</label>
                <ComboBox id="formClass" classList={['form-control']} value={'TableForm'} items={[
                    {value: 'RowForm', title: 'RowForm'},
                    {value: 'TableForm', title: 'TableForm'},
                    {value: 'TreeForm', title: 'TreeForm'},
                ]}/>
            </div>
            <div className="form-group">
                <label htmlFor="formName">Name</label>
                <TextBox id="formName" classList={['form-control']} value={ctrl.options.tableController.model.getName()}/>
            </div>
            <div className="form-group">
                <label htmlFor="formCaption">Caption</label>
                <TextBox id="formCaption" classList={['form-control']} value={ctrl.options.tableController.model.getName()}/>
            </div>
        </div>
        <div className="modal-footer">
            <button name="create" type="button" className="btn btn-primary">Create</button>
            <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
        </div>
    </div>;
    }
}
