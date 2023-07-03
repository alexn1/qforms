import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormImageFieldController } from './RowFormImageFieldController';
import './RowFormImageFieldView.less';
import { Image } from '../../../../../../common/widget/Image/Image';

export class RowFormImageFieldView extends RowFormFieldView<RowFormImageFieldController> {
    onImageClick = async (e) => {
        const ctrl = this.getCtrl();
        console.debug('RowFormImageFieldView.onImageClick');
    };

    render() {
        const ctrl = this.getCtrl();
        return (
            <div className={this.getCssClassNames()} style={this.getStyle(ctrl.getRow())}>
                <Image src={ctrl.getValueForWidget()} onClick={this.onImageClick} />
            </div>
        );
    }
}
