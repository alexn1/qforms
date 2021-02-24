class NewFormView extends ReactComponent {
    render() {
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 className="modal-title">New Form</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <input id="caption" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="formClass">Class</label>
                    <select id="formClass" className="form-control">
                        <option value="RowForm">RowForm</option>
                        <option value="TableForm" selected>TableForm</option>
                        <option value="TreeForm">TreeForm</option>
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
