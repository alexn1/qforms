import { createRef } from 'react';
import { ReactComponent, TextBox, ComboBox, Button } from '../../../common';

export class NewDataSourceView extends ReactComponent {
    name: any;
    class: any;

    constructor(props) {
        super(props);
        this.el = createRef();
        this.name = null;
        this.class = null;
    }

    onCreate = async (e?) => {
        // console.debug('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            name: this.name.getValue(),
            class: this.class.getValue(),
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
                    <div className={'NewModelView__title'}>New Data Source</div>
                    <button type="button" className="close" onClick={ctrl.onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className={'NewModelView__body'}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <TextBox
                            id={'name'}
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
                                { value: 'DataSource', title: 'DataSource' },
                                { value: 'SqlDataSource', title: 'SqlDataSource' },
                                { value: 'NoSqlDataSource', title: 'NoSqlDataSource' },
                            ]}
                            onCreate={(c) => (this.class = c)}
                            value={'SqlDataSource'}
                        />
                    </div>
                </div>
                <div className={'NewModelView__footer'}>
                    <Button onClick={ctrl.onClose}>Close</Button>
                    <Button name="create" onClick={this.onCreate}>
                        Create
                    </Button>
                </div>
            </div>
        );
    }
}
