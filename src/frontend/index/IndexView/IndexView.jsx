class IndexView extends ReactComponent {
    renderModals() {
        const ctrl = this.props.ctrl;
        return (
            <div>
                {ctrl.modals.map(modal =><Modal key={modal.id.toString()}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Button classList={['close']} onClick={ctrl.closeModal}>
                                    <span>&times;</span>
                                </Button>
                                <h4 className="modal-title">New Application</h4>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <label htmlFor="folderName">Folder Name</label>
                                    <TextBox id="folderName" onCreate={ctrl.onFolderNameCreate} onChange={ctrl.onFolderNameChange}/>
                                </div>
                                <div>
                                    <label htmlFor="appName">Application Name</label>
                                    <TextBox id="appName" onChange={ctrl.onAppNameChange}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/*<button name="create" type="button" className="btn btn-primary">Create</button>*/}
                                <Button name="create" classList={['btn', 'btn-primary']} onClick={ctrl.onCreateClick}>Create</Button>
                                <Button classList={['btn', 'btn-default']} onClick={ctrl.closeModal}>Close</Button>
                            </div>
                        </div>
                    </div>
                </Modal>)}
            </div>
        );
    }
    render() {
        console.log('IndexView.render');
        const ctrl = this.props.ctrl;
        return (
            <div className="IndexView">
                <div className="container" style={{backgroundColor: '#eee'}}>
                    <div className="row" style={{margin: '50px 0'}}>
                        <div>
                            <ComboBox
                                value={ctrl.currentAppFullName}
                                items={ctrl.getAppItems()}
                                size={15}
                                style={{width: '100%'}}
                                onDoubleClick={ctrl.run}
                                onChange={ctrl.onAppChange}
                            />
                        </div>
                        <div>
                            <div>
                                <ComboBox
                                    value={ctrl.currentAppEnv}
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
                {this.renderModals()}
            </div>
        );
    }
}
