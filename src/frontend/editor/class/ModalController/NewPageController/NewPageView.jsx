class NewPageView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <div className="modal-content" style={{width: 360, margin: 'auto'}}>
            <div className="modal-header">
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
                <h4 className="modal-title">New Page</h4>
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
                    <label htmlFor="startup">Startup</label>
                    <select id="startup" className="form-control">
                        <option selected>false</option>
                        <option>true</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button name="create" type="button" className="btn btn-primary">Create</button>
                <button type="button" className="btn btn-default" onClick={ctrl.onClose}>Close</button>
            </div>
        </div>;
    }
}
