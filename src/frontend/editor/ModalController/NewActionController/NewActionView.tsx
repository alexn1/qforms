import {ReactComponent, TextBox} from '../../../common';

export class NewActionView extends ReactComponent {
    name: any;
    caption: any;
    constructor(props) {
        super(props);
        this.name    = null;
        this.caption = null;
    }
    onCreate = async e => {
        // console.log('NewActionView.onCreate');
        await this.props.ctrl.onCreate({
            name   : this.name.getValue(),
            caption: this.caption.getValue(),
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <div className={'NewModelView__title'}>New Action</div>
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
            </div>
            <div className={'NewModelView__body'}>
                <div>
                    <label htmlFor="name">Name</label>
                    <TextBox id="name" onCreate={c => this.name = c} autocomplete={'off'} autoFocus={true}/>
                </div>
                <div>
                    <label htmlFor="caption">Caption</label>
                    <TextBox id="caption" onCreate={c => this.caption = c} autocomplete={'off'}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <button type="button" onClick={ctrl.onClose}>Close</button>
                <button name="create" type="button" onClick={this.onCreate}>Create</button>
            </div>
        </div>;
    }
}
