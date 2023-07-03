import { createRef } from 'react';
import { ReactComponent, TextBox, ComboBox } from '../../../common';

export class NewFieldView extends ReactComponent {
    class: any;
    name: any;
    caption: any;
    type: any;

    constructor(props) {
        super(props);
        this.el = createRef();
        this.class = null;
        this.name = null;
        this.caption = null;
        this.type = null;
    }

    onCreate = async (e?) => {
        // console.debug('NewFieldView.onCreate');
        await this.props.ctrl.onCreate({
            class: this.class.getValue(),
            name: this.name.getValue(),
            caption: this.caption.getValue() || this.name.getValue(),
            type: this.type.getValue(),
        });
    };

    onKeyDown = (e) => {
        if (e.key === 'Escape') {
            this.props.ctrl.onClose();
        } else if (e.key === 'Enter') {
            this.onCreate();
        }
    };

    render() {
        const ctrl = this.props.ctrl;
        return (
            <div
                className={`${this.getCssClassNames()} NewModelView`}
                ref={this.el}
                tabIndex={0}
                onKeyDown={this.onKeyDown}>
                <div className={'NewModelView__header'}>
                    <div className={'NewModelView__title'}>New Field</div>
                    <button type="button" className="close" onClick={ctrl.onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className={'NewModelView__body'}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <TextBox
                            id="name"
                            onCreate={(c) => (this.name = c)}
                            autocomplete={'off'}
                            autoFocus={true}
                        />
                    </div>
                    <div>
                        <label htmlFor="class">Class</label>
                        <ComboBox
                            id="class"
                            items={[
                                { value: 'TextBoxField' },
                                { value: 'ComboBoxField' },
                                { value: 'TextAreaField' },
                                { value: 'LinkField' },
                                { value: 'ImageField' },
                                { value: 'LabelField' },
                                { value: 'DateField' },
                                { value: 'TimeField' },
                                { value: 'DateTimeField' },
                                { value: 'CheckBoxField' },
                                { value: 'CheckBoxListField' },
                                { value: 'FileField' },
                                { value: 'PhoneField' },
                                { value: 'PasswordField' },
                                { value: 'RadioField' },
                            ]}
                            onCreate={(c) => (this.class = c)}
                        />
                    </div>
                    <div>
                        <label htmlFor="caption">Caption</label>
                        <TextBox
                            id="caption"
                            onCreate={(c) => (this.caption = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <ComboBox
                            id="type"
                            value={''}
                            items={[
                                { value: '', title: '' },
                                { value: 'string', title: 'string' },
                                { value: 'number', title: 'number' },
                                { value: 'boolean', title: 'boolean' },
                                { value: 'object', title: 'object' },
                                { value: 'date', title: 'date' },
                            ]}
                            onCreate={(c) => (this.type = c)}
                        />
                    </div>
                </div>
                <div className={'NewModelView__footer'}>
                    <button type="button" onClick={ctrl.onClose}>
                        Close
                    </button>
                    <button name="create" type="button" onClick={this.onCreate}>
                        Create
                    </button>
                </div>
            </div>
        );
    }
}
