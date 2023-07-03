import { createRef } from 'react';
import { ReactComponent, TextBox, ComboBox } from '../../../common';

export class NewPageView extends ReactComponent {
    name: any;
    caption: any;
    startup: any;

    constructor(props) {
        super(props);
        this.el = createRef();
        this.name = null;
        this.caption = null;
        this.startup = null;
    }

    onCreate = async (e?) => {
        // console.debug('NewPageView.onCreate');
        await this.props.ctrl.onCreate({
            name: this.name.getValue(),
            caption: this.caption.getValue(),
            startup: this.startup.getValue(),
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
                    <div className={'NewModelView__title'}>New Page</div>
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
                        <label htmlFor="caption">Caption</label>
                        <TextBox
                            id="caption"
                            onCreate={(c) => (this.caption = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="startup">Startup</label>
                        <ComboBox
                            id="startup"
                            items={[
                                { value: 'false', title: 'false' },
                                { value: 'true', title: 'true' },
                            ]}
                            onCreate={(c) => (this.startup = c)}
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
