class ChangeClassView extends ReactComponent {
    render() {
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                <h4 className="modal-title">Change Field Class</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="fieldClass">Class</label>
                    <select id="fieldClass" className="form-control">
                        <option value="TextBoxField">TextBoxField</option>
                        <option value="ComboBoxField">ComboBoxField</option>
                        <option value="TextAreaField">TextAreaField</option>
                        <option value="LinkField">LinkField</option>
                        <option value="ImageField">ImageField</option>
                        <option value="LabelField">LabelField</option>
                        <option value="DatePickerField">DatePickerField</option>
                        <option value="TimeField">TimeField</option>
                        <option value="DateTimeField">DateTimeField</option>
                        <option value="CheckBoxField">CheckBoxField</option>
                        <option value="FileField">FileField</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button name="change" type="button" className="btn btn-primary">Change</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>;
    }
}
