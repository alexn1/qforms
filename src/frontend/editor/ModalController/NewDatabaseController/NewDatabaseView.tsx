import { createRef } from 'react';
import { ReactComponent, ComboBox, TextBox, Button } from '../../../common';

export class NewDatabaseView extends ReactComponent {
    class: any;
    name: any;
    host: any;
    database: any;
    user: any;
    password: any;

    constructor(props) {
        super(props);
        this.el = createRef();
        this.class = null;
        this.name = null;
        this.host = null;
        this.database = null;
        this.user = null;
        this.password = null;
    }

    onCreate = async (e?) => {
        // console.log('NewDatabaseView.onCreate');
        await this.props.ctrl.onCreate({
            class: this.class.getValue(),
            name: this.name.getValue(),
            host: this.host.getValue(),
            database: this.database.getValue(),
            user: this.user.getValue(),
            password: this.password.getValue(),
        });
    };

    onKeyDown = (e) => {
        console.log('NewDatabaseView.onKeyDown', e);
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
                <div className={`NewModelView__header`}>
                    <div className={`NewModelView__title`}>New Database</div>
                    <button type="button" className="close" onClick={ctrl.onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className={`NewModelView__body`}>
                    <div>
                        <label htmlFor="class">Class</label>
                        <ComboBox
                            id={'class'}
                            items={[
                                { value: 'MySqlDatabase', title: 'MySqlDatabase' },
                                { value: 'PostgreSqlDatabase', title: 'PostgreSqlDatabase' },
                                { value: 'MongoDbDatabase', title: 'MongoDbDatabase' },
                            ]}
                            onCreate={(c) => (this.class = c)}
                            value={'PostgreSqlDatabase'}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <TextBox
                            id={'name'}
                            value={'default'}
                            onCreate={(c) => (this.name = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="host">Host</label>
                        <TextBox
                            id={'host'}
                            value={'localhost'}
                            onCreate={(c) => (this.host = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="database">Database</label>
                        <TextBox
                            id={'database'}
                            value={'test'}
                            onCreate={(c) => (this.database = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="user">User</label>
                        <TextBox
                            id={'user'}
                            value={'test'}
                            onCreate={(c) => (this.user = c)}
                            autocomplete={'off'}
                        />
                    </div>
                    <div>
                        <label htmlFor="user">Password</label>
                        <TextBox
                            id={'password'}
                            value={'123qwe'}
                            onCreate={(c) => (this.password = c)}
                            autocomplete={'off'}
                        />
                    </div>
                </div>
                <div className={`NewModelView__footer`}>
                    <Button onClick={ctrl.onClose}>Close</Button>
                    <Button name="create" onClick={this.onCreate}>
                        Create
                    </Button>
                </div>
            </div>
        );
    }
}
