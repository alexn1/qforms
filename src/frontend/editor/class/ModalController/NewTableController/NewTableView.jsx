class NewTableView extends ReactComponent {
    render() {
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close"><span>&times;</span></button>
                <h4 className="modal-title">New Table</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="tableName">Name</label>
                    <input id="tableName" className="form-control"/>
                </div>
            </div>
            <div className="modal-footer">
                <button name="create" type="button" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-default">Close</button>
            </div>
        </div>;
    }
}
