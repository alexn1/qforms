import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormLinkFieldController } from './RowFormLinkFieldController';
import './RowFormLinkFieldView.less';

export class RowFormLinkFieldView extends RowFormFieldView<RowFormLinkFieldController> {
    render() {
        const ctrl = this.getCtrl();
        let href = ctrl.getValueForWidget();
        const pageName = ctrl.getModel().getAttr('page');
        if (pageName) {
            const value = ctrl.getValueForWidget();
            href = ctrl.getPage().createOpenInNewLink(pageName, JSON.stringify([value]));
            // console.log('href:', link);
        }

        return (
            <div className={this.getCssClassNames()}>
                <a href={href} onClick={ctrl.onClick} target={'_blank'}>
                    {ctrl.getValueForWidget()}
                </a>
            </div>
        );
    }
}

// @ts-ignore
window.RowFormLinkFieldView = RowFormLinkFieldView;
