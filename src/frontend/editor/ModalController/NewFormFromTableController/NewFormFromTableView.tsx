import { createRef } from 'react';
import { ReactComponent, TextBox, ComboBox } from '../../../common';

export class NewFormFromTableView extends ReactComponent {
    page: any;
    class: any;
    name: any;
    caption: any;

    constructor(props) {
        super(props);
        this.page = null;
        this.class = null;
        this.name = null;
        this.caption = null;
    }

    onCreate = async (e) => {
        // console.log('NewDataSourceView.onCreate');
        await this.props.ctrl.onCreate({
            page: this.page.getValue(),
            class: this.class.getValue(),
            name: this.name.getValue(),
            caption: this.caption.getValue(),
        });
    };

    render() {
        const ctrl = this.props.ctrl;
        const tableController = ctrl.options.tableController;
        const pages = tableController.model.parent.parent.pageLinks.map((pageLink) => ({
            value: pageLink.getName(),
            title: pageLink.getName(),
        }));
        console.log('pages:', pages);
        return (
            <div className={`${this.getCssClassNames()} NewModelView`}>
                <div className={'NewModelView__header'}>
                    <div className={'NewModelView__title'}>New Form</div>
                    <button type="button" className="close" onClick={ctrl.onClose}>
                        <span>&times;</span>
                    </button>
                </div>
                <div className={'NewModelView__body'}>
                    <div>
                        <label htmlFor="table">Table</label>
                        <TextBox
                            id="table"
                            disabled={true}
                            value={tableController.model.getName()}
                        />
                    </div>
                    <div>
                        <label htmlFor="page">Page</label>
                        <ComboBox
                            id="page"
                            items={pages}
                            value={pages[pages.length - 1].value}
                            onCreate={(c) => (this.page = c)}
                        />
                    </div>
                    <div>
                        <label htmlFor="class">Form Class</label>
                        <ComboBox
                            id="class"
                            value={'TableForm'}
                            items={[
                                { value: 'RowForm', title: 'RowForm' },
                                { value: 'TableForm', title: 'TableForm' },
                            ]}
                            onCreate={(c) => (this.class = c)}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <TextBox
                            id="name"
                            value={ctrl.options.tableController.model.getName()}
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
