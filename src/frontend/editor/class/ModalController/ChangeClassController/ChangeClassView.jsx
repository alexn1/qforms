class ChangeClassView extends ReactComponent {
    constructor(props) {
        super(props);
        this.class = null;
    }
    onCreate = async e => {
        // console.log('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            class: this.class.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">Change Field Class</h4>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="class">Class</label>
                    <ComboBox id="class" classList={['form-control']} items={[
                        {value: 'TextBoxField', title: 'TextBoxField'},
                        {value: 'ComboBoxField', title: 'ComboBoxField'},
                        {value: 'TextAreaField', title: 'TextAreaField'},
                        {value: 'LinkField', title: 'LinkField'},
                        {value: 'ImageField', title: 'ImageField'},
                        {value: 'LabelField', title: 'LabelField'},
                        {value: 'DatePickerField', title: 'DatePickerField'},
                        {value: 'TimeField', title: 'TimeField'},
                        {value: 'DateTimeField', title: 'DateTimeField'},
                        {value: 'CheckBoxField', title: 'CheckBoxField'},
                        {value: 'FileField', title: 'FileField'},
                    ]} onCreate={c => this.class = c}/>
                </div>
            </div>
            <div className="modal-footer">
                <button name="change" type="button" className="btn btn-primary" onClick={this.onCreate}>Change</button>
                <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
            </div>
        </div>;
    }
}
