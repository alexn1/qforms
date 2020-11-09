class AppView extends ReactComponent {
    render() {
        console.log('AppView.render', this.props.ctrl);
        const ctrl = this.props.ctrl;
        return (
            <div className="AppView">
                <div className="container" style={{backgroundColor: '#eee'}}>
                    <div className="row" style={{margin: '50px 0'}}>
                        <div className="col-md-offset-2 col-md-6 col-sm-offset-1 col-sm-6 col-xs-8">
                            <ComboBox id="lbApp" items={ctrl.getItems()} size={15} style={{width: '100%'}}/>
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-4">
                            <div className="form-group">
                                <select id="ddEnv" className="form-control">
                                    <option value="local">local</option>
                                </select>
                            </div>
                            <button id="btnRun" className="btn btn-primary btn-block">Run</button>

                            <button id="btnEdit" className="btn btn-default btn-block">Edit</button>
                            <button id="btnCreate" className="btn btn-default btn-block">New...</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
