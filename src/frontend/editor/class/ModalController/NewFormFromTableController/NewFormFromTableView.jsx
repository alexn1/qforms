class NewFormFromTableView extends ReactComponent {
    constructor(props) {
        super(props);
        this.page = null;
        this.class = null;
        this.name  = null;
        this.caption  = null;
    }
    onCreate = async e => {
        // console.log('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            page   : this.page.getValue(),
            class  : this.class.getValue(),
            name   : this.name.getValue(),
            caption: this.caption.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        const tableController = ctrl.options.tableController;
        const pages = tableController.model.parent.parent.pageLinks.map(pageLink => ({value: pageLink.getName(), title: pageLink.getName()}))
        console.log('pages:', pages);
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Form</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="table">Table</label>
                    <TextBox id="table" classList={['form-control']} disabled={true} value={tableController.model.getName()}/>
                </div>
                <div className="form-group">
                    <label htmlFor="page">Page</label>
                    <ComboBox id="page" classList={['form-control']} items={pages} value={pages[pages.length-1].value} onCreate={c => this.page = c}/>
            </div>
            <div className="form-group">
                <label htmlFor="class">Form Class</label>
                <ComboBox id="class" classList={['form-control']} value={'TableForm'} items={[
                    {value: 'RowForm', title: 'RowForm'},
                    {value: 'TableForm', title: 'TableForm'},
                    {value: 'TreeForm', title: 'TreeForm'},
                ]} onCreate={c => this.class = c}/>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <TextBox id="name" classList={['form-control']} value={ctrl.options.tableController.model.getName()} onCreate={c => this.name = c}/>
            </div>
            <div className="form-group">
                <label htmlFor="caption">Caption</label>
                <TextBox id="caption" classList={['form-control']} value={ctrl.options.tableController.model.getName()} onCreate={c => this.caption = c}/>
            </div>
        </div>
        <div className="modal-footer">
            <button name="create" type="button" className="btn btn-primary" onClick={this.onCreate}>Create</button>
            <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
        </div>
    </div>;
    }
}
