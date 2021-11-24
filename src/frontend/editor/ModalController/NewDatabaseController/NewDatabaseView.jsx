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
        return <div className="NewDatabaseView modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Database</h4>
            </div>
            <div className="modal-body">
                <div>
                    <label htmlFor="class">Class</label>
                    <ComboBox id={'class'} items={[
                        {value: 'MySqlDatabase'     , title: 'MySqlDatabase'},
                        {value: 'PostgreSqlDatabase', title: 'PostgreSqlDatabase'}
                    ]} onCreate={c => this.class = c} value={'PostgreSqlDatabase'}/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <TextBox id={'name'} value={'default'} onCreate={c => this.name = c} autocomplete={'off'}/>
                </div>
                <div>
                    <label htmlFor="host">Host</label>
                    <TextBox id={'host'} value={'localhost'} onCreate={c => this.host = c} autocomplete={'off'}/>
                </div>
                <div>
                    <label htmlFor="database">Database</label>
                    <TextBox id={'database'} value={'test'} onCreate={c => this.database = c} autocomplete={'off'}/>
                </div>
                <div>
                    <label htmlFor="user">User</label>
                    <TextBox id={'user'} value={'test'} onCreate={c => this.user = c} autocomplete={'off'}/>
                </div>
                <div>
                    <label htmlFor="user">Password</label>
                    <TextBox id={'password'} value={'123qwe'} onCreate={c => this.password = c} autocomplete={'off'}/>
                </div>
            </div>
            <div className="modal-footer">
                <Button name="create" classList={['btn', 'btn-primary']} onClick={this.onCreate}>Create</Button>
                <Button classList={['btn', 'btn-default']} onClick={ctrl.onClose}>Close</Button>
            </div>
        </div>;
    }
}
