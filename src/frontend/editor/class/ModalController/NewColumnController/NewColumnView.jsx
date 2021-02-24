class NewColumnView extends ReactComponent {
    render() {
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 className="modal-title">New Column</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="columnName">Name</label>
                    <input id="columnName" className="form-control"/>
                </div>
            </div>
            <div className="modal-footer">
                <button name="create" type="button" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>;
    }
}
