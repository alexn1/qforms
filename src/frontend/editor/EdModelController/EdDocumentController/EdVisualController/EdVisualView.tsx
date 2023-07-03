import * as React from 'react';
import { EdDocumentView } from '../EdDocumentView';
import { Button } from '../../../../common';

import './EdVisualView.less';

export class EdVisualView extends EdDocumentView {
    textarea: React.RefObject<any>;
    cm: any;

    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.cm = null;
    }

    getTextarea() {
        if (this.textarea) return this.textarea.current;
        return null;
    }

    componentDidMount() {
        // console.debug('VisualView.componentDidMount', this.getTextarea());
        const ctrl = this.props.ctrl;
        if (ctrl.data.js) {
            this.cm = EdDocumentView.createCM(this.getTextarea(), ctrl.data.js);
            this.cm.on('change', this.onChange);
        }
    }

    componentDidUpdate() {
        // console.debug('componentDidUpdate', this.getTextarea());
        const ctrl = this.props.ctrl;
        const textarea = this.getTextarea();
        if (textarea && ctrl.data.js && !this.cm) {
            this.cm = EdDocumentView.createCM(this.getTextarea(), ctrl.data.js);
        }
    }

    componentWillUnmount() {
        // console.debug('VisualView.componentWillUnmount');
        if (this.cm) {
            this.cm.off('change', this.onChange);
        }
    }

    onControllerSave = async (e) => {
        const ctrl = this.props.ctrl;
        await ctrl.onControllerSave(this.cm.getValue());
    };

    onChange = async (instance, changeObj) => {
        // console.debug('VisualView.onChange', this.isChanged());
        await this.rerender();
    };

    isChanged() {
        if (!this.cm) {
            return false;
        }
        return this.props.ctrl.data.js !== this.cm.getValue();
    }

    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={'EdVisualView full'}>
                <div className="full flex-column">
                    <div className="toolbar">
                        <Button onClick={ctrl.onCreateModelBack}>Model.back.js</Button>
                        {!ctrl.data.js && (
                            <Button onClick={ctrl.onCreateCustomController}>
                                Controller.front.js
                            </Button>
                        )}
                        {!ctrl.data.jsx && (
                            <Button onClick={ctrl.onCreateCustomView}>View.jsx</Button>
                        )}
                        {!ctrl.data.less && (
                            <Button onClick={ctrl.onCreateCustomStyle}>View.less</Button>
                        )}
                        {ctrl.data.js && (
                            <Button onClick={this.onControllerSave} enabled={this.isChanged()}>
                                Save
                            </Button>
                        )}
                    </div>
                    <div className={'edit flex-max full'}>
                        <div className={'cm-container full'}>
                            {ctrl.data.js && <textarea ref={this.textarea} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
