import { ReactComponent, Modal, Button, TextBox, ComboBox } from '../../common';
import './IndexView.less';

export class IndexView extends ReactComponent {
    renderModals() {
        const { ctrl } = this.props;
        return (
            <div>
                {ctrl.modals.map((modal) => (
                    <Modal key={modal.id.toString()}>
                        <div className="IndexView__dialog">
                            <div className="IndexView__dialog-header">
                                <h4 className="IndexView__dialog-title">New Application</h4>
                                <Button
                                    classList={['IndexView__dialog-close']}
                                    onClick={ctrl.closeModal}>
                                    &times;
                                </Button>
                            </div>
                            <div className="IndexView__dialog-body">
                                <div className="IndexView__field">
                                    <label htmlFor="folderName">Folder Name</label>
                                    <TextBox
                                        id="folderName"
                                        onCreate={ctrl.onFolderNameCreate}
                                        onChange={ctrl.onFolderNameChange}
                                    />
                                </div>
                                <div className="IndexView__field">
                                    <label htmlFor="appName">Application Name</label>
                                    <TextBox id="appName" onChange={ctrl.onAppNameChange} />
                                </div>
                            </div>
                            <div className="IndexView__dialog-footer">
                                <Button
                                    name="create"
                                    classList={['IndexView__btn', 'IndexView__btn_primary']}
                                    onClick={ctrl.onCreateClick}>
                                    Create
                                </Button>
                                <Button classList={['IndexView__btn']} onClick={ctrl.closeModal}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Modal>
                ))}
            </div>
        );
    }

    render() {
        console.debug('IndexView.render');
        const { ctrl } = this.props;
        return (
            <div className="IndexView">
                <div className="IndexView__card">
                    <div className="IndexView__header">
                        <h1 className="IndexView__title">QForms</h1>
                        <div className="IndexView__subtitle">Select an application</div>
                    </div>
                    <div className="IndexView__content">
                        <div className="IndexView__apps">
                            <ComboBox
                                classList={['IndexView__list']}
                                value={ctrl.currentAppFullName}
                                items={ctrl.getAppItems()}
                                size={15}
                                onDoubleClick={ctrl.run}
                                onChange={ctrl.onAppChange}
                            />
                        </div>
                        <div className="IndexView__actions">
                            <label className="IndexView__label">Environment</label>
                            <ComboBox
                                classList={['IndexView__env']}
                                value={ctrl.currentAppEnv}
                                items={ctrl.getEnvItems()}
                                onChange={ctrl.onEnvChange}
                            />
                            <Button
                                classList={['IndexView__btn', 'IndexView__btn_primary']}
                                onClick={ctrl.run}>
                                Run
                            </Button>
                            {ctrl.data.nodeEnv === 'dev' && (
                                <Button classList={['IndexView__btn']} onClick={ctrl.edit}>
                                    Edit
                                </Button>
                            )}
                            {ctrl.data.nodeEnv === 'dev' && (
                                <Button
                                    classList={['IndexView__btn']}
                                    onClick={ctrl.btnCreate_Click}>
                                    New...
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                {this.renderModals()}
            </div>
        );
    }
}
