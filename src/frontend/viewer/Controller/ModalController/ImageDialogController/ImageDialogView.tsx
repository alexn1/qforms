import React from 'react';
import { View } from '../../View';
import { CloseIcon2 } from '../../../../common';

export class ImageDialogView extends View {
    constructor(props) {
        super(props);
        this.el = React.createRef();
    }
    render() {
        console.log('ImageDialogView.render');
        const { ctrl } = this.props;
        return (
            <div
                className={this.getCssClassNames()}
                ref={this.el}
                tabIndex={0}
                onKeyDown={this.getCtrl().onKeyDown}
            >
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
