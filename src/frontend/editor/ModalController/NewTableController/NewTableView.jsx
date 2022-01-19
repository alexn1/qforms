class NewTableView extends ReactComponent {
    constructor(props) {
        super(props);
        this.name = null;
    }
    onCreate = async e => {
        // console.log('NewParamView.onCreate');
        await this.props.ctrl.onCreate({
            name: this.name.getValue()
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <div className={'NewModelView__title'}>New Table</div>
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
            </div>
            <div className={'NewModelView__body'}>
                <div>
                    <label htmlFor="tableName">Name</label>
                    <TextBox id="tableName" onCreate={c => this.name = c}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <button name="create" type="button" className="btn btn-primary" onClick={this.onCreate}>Create</button>
                <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
            </div>
        </div>;
    }
}
