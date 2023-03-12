import { createRef } from 'react';
import { ReactComponent, TextBox } from '../../../common';

export class NewColumnView extends ReactComponent {
    name: any;

    constructor(props) {
        super(props);
        this.el = createRef();
        this.name = null;
    }

    onCreate = async (e?) => {
        // console.log('NewParamView.onCreate');
        await this.props.ctrl.onCreate({
            name: this.name.getValue(),
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
                    <div className={'NewModelView__title'}>New Column</div>
                    <button type="button" className="close" onClick={ctrl.onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className={'NewModelView__body'}>
                    <div>
                        <label htmlFor="columnName">Name</label>
                        <TextBox id="columnName" onCreate={(c) => (this.name = c)} />
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
