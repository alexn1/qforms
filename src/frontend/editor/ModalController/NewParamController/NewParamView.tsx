import {ReactComponent, TextBox} from '../../../common';

export class NewParamView extends ReactComponent {
    name: any;
    constructor(props) {
        super(props);
        this.name = null;
    }
    onCreate = async e => {
        // console.log('NewParamView.onCreate');
        await this.props.ctrl.onCreate({
            name: this.name.getValue()
        });
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={`${this.getCssClassNames()} NewModelView`}>
            <div className={'NewModelView__header'}>
                <div className={'NewModelView__title'}>New Param</div>
                <button type="button" className="close" onClick={ctrl.onClose}><span>&times;</span></button>
            </div>
            <div className={'NewModelView__body'}>
                <div>
                    <label htmlFor="name">Name</label>
                    <TextBox id="name" onCreate={c => this.name = c} autocomplete={'off'} autoFocus={true}/>
                </div>
            </div>
            <div className={'NewModelView__footer'}>
                <button type="button" onClick={ctrl.onClose}>Close</button>
                <button name="create" type="button" onClick={this.onCreate}>Create</button>
            </div>
        </div>;
    }
}
