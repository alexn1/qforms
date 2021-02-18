class ModalView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <Modal>
            <div className="modal-content" style={{width: 360, margin: 'auto'}}>
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" onClick={ctrl.onClose}><span>&times;</span></button>
                    <h4 className="modal-title">New Database</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <select id="class" className="form-control">
                            <option value="MySqlDatabase">MySqlDatabase</option>
                            <option value="PostgreSqlDatabase">PostgreSqlDatabase</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" className="form-control" value="default"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="host">Host</label>
                        <input id="host" className="form-control" value="localhost"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dbname">Database</label>
                        <input id="dbname" className="form-control" value="test"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">User</label>
                        <input id="user" className="form-control" value="test"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="user">Password</label>
                        <input id="password" className="form-control" value="123qwe"/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button name="create" type="button" className="btn btn-primary">Create</button>
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </Modal>;
    }
}
