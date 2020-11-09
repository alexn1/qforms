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
                            <Button classList={['btn', 'btn-primary', 'btn-block']} onClick={ctrl.run}>Run</Button>
                            {ctrl.data.nodeEnv === 'development' &&
                                <Button classList={['btn', 'btn-default', 'btn-block']} onClick={ctrl.edit}>Edit</Button>
                            }
                            {ctrl.data.nodeEnv === 'development' &&
                                <Button classList={['btn', 'btn-default', 'btn-block']} onClick={ctrl.btnCreate_Click}>New...</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
