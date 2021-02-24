class NewFormFromTableView extends ReactComponent {
    render() {
        return <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 class="modal-title">New Form</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="formTable">Table</label>
                    <input id="formTable" class="form-control" disabled/>
                </div>
                <div class="form-group">
                    <label for="formPage">Page</label>
                    <select id="formPage" class="form-control">

                    </select>
            </div>
            <div class="form-group">
                <label for="formClass">Form Class</label>
                <select id="formClass" class="form-control">
                    <option value="RowForm">RowForm</option>
                    <option value="TableForm" selected>TableForm</option>
                    <option value="TreeForm">TreeForm</option>
                </select>
            </div>
            <div class="form-group">
                <label for="formName">Name</label>
                <input id="formName" class="form-control" value="<%=tableName%>"/>
            </div>
            <div class="form-group">
                <label for="formCaption">Caption</label>
                <input id="formCaption" class="form-control" value="<%=tableName%>"/>
            </div>
        </div>
        <div class="modal-footer">
            <button name="create" type="button" class="btn btn-primary">Create</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>;
    }
}
