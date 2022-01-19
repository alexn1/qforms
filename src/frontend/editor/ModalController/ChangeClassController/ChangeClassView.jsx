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
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <div className={'NewModelView__title'}>Change Field Class</div>
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
                    ]} value={ctrl.options.fieldCtrl.model.getClassName()} onCreate={c => this.class = c}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
                <button name="change" type="button" className="btn btn-primary" onClick={this.onCreate}>Change</button>
            </div>
        </div>;
    }
}
