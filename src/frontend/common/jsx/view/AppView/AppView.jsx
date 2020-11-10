class AppView extends ReactComponent {
    render() {
        console.log('AppView.render');
        const ctrl = this.props.ctrl;
        return (
            <div className="AppView">
                <div className="container" style={{backgroundColor: '#eee'}}>
                    <div className="row" style={{margin: '50px 0'}}>
                        <div className="col-md-offset-2 col-md-6 col-sm-offset-1 col-sm-6 col-xs-8">
                            <ComboBox
                                value={ctrl.currentAppFullName}
                                id="lbApp"
                                items={ctrl.getAppItems()}
                                size={15}
                                style={{width: '100%'}}
                                onDoubleClick={ctrl.run}
                                onChange={ctrl.onAppChange}
                            />
                        </div>
                        <div className="col-md-2 col-sm-3 col-xs-4">
                            <div className="form-group">
                                <ComboBox
                                    value={ctrl.currentAppEnv}
                                    classList={['form-control']}
                                    items={ctrl.getEnvItems()}
                                    onChange={ctrl.onEnvChange}
                                />
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
                <Modal>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Button classList={['close']}>
                                    <span>&times;</span>
                                </Button>
                                <h4 className="modal-title">New Application</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="folderName">Folder Name</label>
                                    <TextBox id="folderName" classList={['form-control']}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appName">Application Name</label>
                                    <input id="appName" className="form-control"/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button name="create" type="button" className="btn btn-primary">Create</button>
                                <button type="button" className="btn btn-default">Close</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
