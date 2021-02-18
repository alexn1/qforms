class NewDatabaseView extends ReactComponent {
    constructor(props) {
        super(props);
        this.class = null;
    }
    onCreate = e => {
        console.log('NewDatabaseView.onCreate', {class: this.class.getValue()});
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="NewDatabaseView modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" onClick={ctrl.onClose}>
                    <span>&times;</span>
                </button>
                <h4 className="modal-title">New Database</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <ComboBox id={'class'} classList={['form-control']} items={[
                        {value: 'MySqlDatabase'     , title: 'MySqlDatabase'},
                        {value: 'PostgreSqlDatabase', title: 'PostgreSqlDatabase'}
                    ]} onCreate={c => this.class = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <TextBox id={'name'} classList={['form-control']} value={'default'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="host">Host</label>
                    <TextBox id={'host'} classList={['form-control']} value={'localhost'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="dbname">Database</label>
                    <TextBox id={'dbname'} classList={['form-control']} value={'test'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <TextBox id={'user'} classList={['form-control']} value={'test'}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">Password</label>
                    <TextBox id={'password'} classList={['form-control']} value={'123qwe'}/>
                </div>
            </div>
            <div className="modal-footer">
                <Button name="create" classList={['btn', 'btn-primary']} onClick={this.onCreate}>Create</Button>
                <Button classList={['btn', 'btn-default']} onClick={ctrl.onClose}>Close</Button>
            </div>
        </div>;
    }
}
