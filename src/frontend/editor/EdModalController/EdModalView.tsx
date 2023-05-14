import * as React from 'react';
import { ReactComponent, Modal } from '../../common';
import './EdModalView.less';
import './NewModelView.less';

export class EdModalView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return (
            <Modal>
                {React.createElement(ctrl.getViewClass(), {
                    ctrl,
                    onCreate: (c) => (ctrl.view = c),
                })}
            </Modal>
        );
    }
}
