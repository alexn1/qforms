class NewDataSourceView extends ReactComponent {
    render() {
        return <div className="NewDataSourceView modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 className="modal-title">New Data Source</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="dsName">Name</label>
                    <input id="dsName" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="dsClass">Class</label>
                    <select id="dsClass" className="form-control">
                        <option value="DataSource" selected>DataSource</option>
                        <option value="SqlDataSource">SqlDataSource</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button name="create" type="button" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>;
    }
}
