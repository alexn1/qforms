class NewDataSourceView extends ReactComponent {
    constructor(props) {
        super(props);
        this.name  = null;
        this.class = null;
    }
    onCreate = async e => {
        // console.log('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            name    : this.name.getValue(),
            class   : this.class.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="NewDataSourceView modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Data Source</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <TextBox id={'name'} classList={['form-control']} onCreate={c => this.name = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <ComboBox id="class" classList={['form-control']} items={[
                        {value: 'DataSource', title: 'DataSource'},
                        {value: 'SqlDataSource', title: 'SqlDataSource'},
                    ]} onCreate={c => this.class = c}/>
                </div>
            </div>
            <div className="modal-footer">
                <Button name="create" classList={['btn', 'btn-primary']} onClick={this.onCreate}>Create</Button>
                <Button classList={['btn', 'btn-default']} onClick={ctrl.onClose}>Close</Button>
            </div>
        </div>;
    }
}
