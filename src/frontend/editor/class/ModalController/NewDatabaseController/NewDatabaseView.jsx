class NewDatabaseView extends ReactComponent {
    constructor(props) {
        super(props);
        this.class    = null;
        this.name     = null;
        this.host     = null;
        this.database = null;
        this.user     = null;
        this.password = null;
    }
    onCreate = async e => {
        // console.log('NewDatabaseView.onCreate');
        await this.props.ctrl.onCreate({
            class   : this.class.getValue(),
            name    : this.name.getValue(),
            host    : this.host.getValue(),
            database: this.database.getValue(),
            user    : this.user.getValue(),
            password: this.password.getValue()
        });
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
                    <TextBox id={'name'} classList={['form-control']} value={'default'} onCreate={c => this.name = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="host">Host</label>
                    <TextBox id={'host'} classList={['form-control']} value={'localhost'} onCreate={c => this.host = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="database">Database</label>
                    <TextBox id={'database'} classList={['form-control']} value={'test'} onCreate={c => this.database = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <TextBox id={'user'} classList={['form-control']} value={'test'} onCreate={c => this.user = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="user">Password</label>
                    <TextBox id={'password'} classList={['form-control']} value={'123qwe'} onCreate={c => this.password = c}/>
                </div>
            </div>
            <div className="modal-footer">
                <Button name="create" classList={['btn', 'btn-primary']} onClick={this.onCreate}>Create</Button>
                <Button classList={['btn', 'btn-default']} onClick={ctrl.onClose}>Close</Button>
            </div>
        </div>;
    }
}
