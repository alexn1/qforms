import React from 'react';
import { View } from '../../View';
import { CloseIcon2 } from '../../../../common';
import './ImageDialogView.less';
import { ImageDialogController } from './ImageDialogController';

export class ImageDialogView<T extends ImageDialogController> extends View<T> {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }

    render() {
        console.debug('ImageDialogView.render');
        const { ctrl } = this.props;
        return (
            <div
                className={this.getCssClassNames()}
                ref={this.el}
                tabIndex={0}
                onKeyDown={this.getCtrl().onKeyDown}>
                <img
                    className={`${this.getCssBlockName()}__image`}
                    src={ctrl.getSrc()}
                    onClick={ctrl.onImageClick}
                />
                <div className={`${this.getCssBlockName()}__close`} onClick={ctrl.onCloseClick}>
                    <CloseIcon2 />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getElement().focus();
    }
}
