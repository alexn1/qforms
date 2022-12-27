import * as React from 'react';
import { ReactComponent, Modal } from '../../common';
import './ModalView.less';
import './NewModelView.less';

export class ModalView extends ReactComponent {
    render() {
        const ctrl = this.props.ctrl;
        return <Modal>{React.createElement(ctrl.getViewClass(), { ctrl })}</Modal>;
    }
}
