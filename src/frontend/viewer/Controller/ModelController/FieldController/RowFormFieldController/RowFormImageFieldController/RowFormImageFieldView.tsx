import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormImageFieldController } from './RowFormImageFieldController';
import './RowFormImageFieldView.less';

export class RowFormImageFieldView extends RowFormFieldView<RowFormImageFieldController> {
    onImageClick = async e => {
        const ctrl = this.props.ctrl;
        console.log('RowFormImageFieldView.onImageClick');
    };
    render() {
        const ctrl = this.props.ctrl;
        return (
            <div className={this.getCssClassNames()} style={this.getStyle(ctrl.getRow())}>
                <Image src={ctrl.getValueForWidget()} onClick={this.onImageClick} />
            </div>
        );
    }
}

// @ts-ignore
window.RowFormImageFieldView = RowFormImageFieldView;
