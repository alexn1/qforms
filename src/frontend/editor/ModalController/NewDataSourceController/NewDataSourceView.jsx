class NewDataSourceView extends ReactComponent {
    constructor(props) {
        super(props);
        this.name  = null;
        this.class = null;
    }
    onCreate = async e => {
        // console.log('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            name    : this.name.getValue(),
            class   : this.class.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <div className={'NewModelView__title'}>New Data Source</div>
            </div>
            <div className={'NewModelView__body'}>
                <div>
                    <label htmlFor="name">Name</label>
                    <TextBox id={'name'} onCreate={c => this.name = c} autocomplete={'off'} autoFocus={true}/>
                </div>
                <div>
                    <label htmlFor="class">Class</label>
                    <ComboBox id="class" items={[
                        {value: 'DataSource', title: 'DataSource'},
                        {value: 'SqlDataSource', title: 'SqlDataSource'},
                    ]} onCreate={c => this.class = c} value={'SqlDataSource'}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <Button name="create" classList={['btn', 'btn-primary']} onClick={this.onCreate}>Create</Button>
                <Button classList={['btn', 'btn-default']} onClick={ctrl.onClose}>Close</Button>
            </div>
        </div>;
    }
}
