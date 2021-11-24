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
                <div>
                    <label htmlFor="table">Table</label>
                    <TextBox id="table" disabled={true} value={tableController.model.getName()}/>
                </div>
                <div>
                    <label htmlFor="page">Page</label>
                    <ComboBox id="page" items={pages} value={pages[pages.length-1].value} onCreate={c => this.page = c}/>
            </div>
            <div>
                <label htmlFor="class">Form Class</label>
                <ComboBox id="class" value={'TableForm'} items={[
                    {value: 'RowForm', title: 'RowForm'},
                    {value: 'TableForm', title: 'TableForm'},
                ]} onCreate={c => this.class = c}/>
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <TextBox id="name" value={ctrl.options.tableController.model.getName()} onCreate={c => this.name = c} autocomplete={'off'} autoFocus={true}/>
            </div>
            <div>
                <label htmlFor="caption">Caption</label>
                <TextBox id="caption" onCreate={c => this.caption = c} autocomplete={'off'}/>
            </div>
        </div>
        <div className="modal-footer">
            <button name="create" type="button" className="btn btn-primary" onClick={this.onCreate}>Create</button>
            <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
        </div>
    </div>;
    }
}
