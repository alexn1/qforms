import React from 'react';
import { RowFormFieldView } from '../RowFormFieldView';
import { Helper, Image, Button, BinaryHelper } from '../../../../../../common';
import { ImageDialogController } from '../../../../ModalController/ImageDialogController/ImageDialogController';
import { RowFormFileFieldController } from './RowFormFileFieldController';
import './RowFormFileFieldView.less';

export class RowFormFileFieldView extends RowFormFieldView<RowFormFileFieldController> {
    image: React.RefObject<any> = React.createRef();
    div: React.RefObject<any> = React.createRef();
    input: React.RefObject<any> = React.createRef();

    getImage() {
        return this.image.current;
    }

    getDiv() {
        return this.div.current;
    }

    getInput() {
        return this.input.current;
    }

    updateSize() {
        if (this.getImage()) {
            const ns = this.getImage().getNaturalSize();
            this.getDiv().innerText = `${ns[0]}×${ns[1]}`;
        }
    }

    onClearClick = (e) => {
        this.getCtrl().onChange('');
    };

    onChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const widgetValue = (await BinaryHelper.readFileAsDataURL(file)) as string;
            // console.debug('widgetValue:', widgetValue);
            this.getCtrl().onChange(widgetValue);
        }
    };

    onImageClick = async (e) => {
        console.debug('RowFormFileFieldView.onImageClick');
        const ctrl = this.getCtrl();
        const app = ctrl.getApp();
        const src = ctrl.getValueForWidget();
        const imageDialogCtrl = new ImageDialogController({
            app,
            id: app.getNewId(),
            src,
            onClose: () => {
                console.debug('onClose');
                this.getCtrl().getPage().getView().getElement().focus();
            },
        });
        await app.openModal(imageDialogCtrl);
    };

    render() {
        const ctrl = this.getCtrl();
        const row = ctrl.getRow();
        const value = ctrl.getValueForWidget();
        return (
            <div className={this.getCssClassNames()} style={this.getStyle(row)}>
                {!!value ? (
                    <div className={`${this.getCssBlockName()}__image-block`}>
                        <Image
                            classList={[`${this.getCssBlockName()}__image`]}
                            ref={this.image}
                            src={value}
                            onClick={this.onImageClick}
                        />
                        <span className={`${this.getCssBlockName()}__size`} ref={this.div}></span>
                        <span className={`${this.getCssBlockName()}__length`}>
                            {Helper.formatNumber(value.length)}
                        </span>
                    </div>
                ) : (
                    <div
                        className={`${this.getCssBlockName()}__image-icon`}
                        onClick={this.onImageIconClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={48 * 2}
                            height={48 * 2}
                            viewBox="0 0 48 48">
                            <path d="M38.65 15.3V11h-4.3V8h4.3V3.65h3V8H46v3h-4.35v4.3ZM4.7 44q-1.2 0-2.1-.9-.9-.9-.9-2.1V15.35q0-1.15.9-2.075.9-.925 2.1-.925h7.35L15.7 8h14v3H17.1l-3.65 4.35H4.7V41h34V20h3v21q0 1.2-.925 2.1-.925.9-2.075.9Zm17-7.3q3.6 0 6.05-2.45 2.45-2.45 2.45-6.1 0-3.6-2.45-6.025Q25.3 19.7 21.7 19.7q-3.65 0-6.075 2.425Q13.2 24.55 13.2 28.15q0 3.65 2.425 6.1Q18.05 36.7 21.7 36.7Zm0-3q-2.4 0-3.95-1.575-1.55-1.575-1.55-3.975 0-2.35 1.55-3.9 1.55-1.55 3.95-1.55 2.35 0 3.925 1.55 1.575 1.55 1.575 3.9 0 2.4-1.575 3.975Q24.05 33.7 21.7 33.7Zm0-5.5Z" />
                        </svg>
                    </div>
                )}
                <div className={`${this.getCssBlockName()}__toolbar`}>
                    <input
                        ref={this.input}
                        type="file"
                        onChange={this.onChange}
                        disabled={!ctrl.isEditable()}
                        style={{ display: !value ? 'none' : undefined }}
                    />
                    {!!value && (
                        <Button onClick={this.onClearClick} enabled={ctrl.isEditable()}>
                            {this.getCtrl().getApp().getModel().getText().field.clear}
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        // console.debug('RowFormFileFieldView.componentDidMount', this.getCtrl().getModel().getFullName());
        setTimeout(() => this.updateSize(), 0);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.debug('RowFormFileFieldView.componentDidUpdate', this.getCtrl().getModel().getFullName(), snapshot);
        setTimeout(() => this.updateSize(), 0);
    }

    onImageIconClick = async (e) => {
        console.debug('RowFormFileFieldView.onImageIconClick');
        this.getInput().click();
    };
}
