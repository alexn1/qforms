class NewFieldView extends ReactComponent {
    constructor(props) {
        super(props);
        this.class   = null;
        this.name    = null;
        this.caption = null;
        this.type    = null;
    }
    onCreate = async e => {
        // console.log('NewFieldView.onCreate');
        await this.props.ctrl.onCreate({
            class  : this.class.getValue(),
            name   : this.name.getValue(),
            caption: this.caption.getValue() || this.name.getValue(),
            type   : this.type.getValue()
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <div className={'NewModelView__title'}>New Field</div>
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
            </div>
            <div className={'NewModelView__body'}>
                <div>
                    <label htmlFor="class">Class</label>
                    <ComboBox id="class" items={[
                        {value: 'TextBoxField'},
                        {value: 'ComboBoxField'},
                        {value: 'TextAreaField'},
                        {value: 'LinkField'},
                        {value: 'ImageField'},
                        {value: 'LabelField'},
                        {value: 'DateField'},
                        {value: 'TimeField'},
                        {value: 'DateTimeField'},
                        {value: 'CheckBoxField'},
                        {value: 'FileField'},
                        {value: 'PhoneField'},
                        {value: 'PasswordField'},
                    ]} onCreate={c => this.class = c}/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <TextBox id="name" onCreate={c => this.name = c} autocomplete={'off'} autoFocus={true}/>
                </div>
                <div>
                    <label htmlFor="caption">Caption</label>
                    <TextBox id="caption" onCreate={c => this.caption = c} autocomplete={'off'}/>
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <ComboBox id="type" value={''} items={[
                        {value: '', title: ''},
                        {value: 'string', title: 'string'},
                        {value: 'number', title: 'number'},
                        {value: 'boolean', title: 'boolean'},
                        {value: 'object', title: 'object'},
                        {value: 'date', title: 'date'},
                    ]} onCreate={c => this.type = c}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <button type="button" onClick={ctrl.onClose}>Close</button>
                <button name="create" type="button" onClick={this.onCreate}>Create</button>
            </div>
        </div>;
    }
}
