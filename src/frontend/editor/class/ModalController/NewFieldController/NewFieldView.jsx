class NewFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.class   = null;
        this.name    = null;
        this.caption = null;
    }
    onCreate = async e => {
        // console.log('NewFieldView.onCreate');
        await this.props.ctrl.onCreate({
            class  : this.class.getValue(),
            name   : this.name.getValue(),
            caption: this.caption.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Field</h4>
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
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <TextBox id="name" classList={['form-control']} onCreate={c => this.name = c}/>
                </div>
                <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <TextBox id="caption" classList={['form-control']} onCreate={c => this.caption = c}/>
                </div>
            </div>
            <div className="modal-footer">
                <button name="create" type="button" className="btn btn-primary" onClick={this.onCreate}>Create</button>
                <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
            </div>
        </div>;
    }
}
