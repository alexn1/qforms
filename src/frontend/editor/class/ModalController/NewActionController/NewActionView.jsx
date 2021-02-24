class NewActionView extends ReactComponent {
    constructor(props) {
        super(props);
        this.name    = null;
        this.caption = null;
    }
    onCreate = async e => {
        // console.log('NewActionView.onCreate');
        await this.props.ctrl.onCreate({
            name   : this.name.getValue(),
            caption: this.caption.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className="modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Action</h4>
            </div>
            <div className="modal-body">
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
