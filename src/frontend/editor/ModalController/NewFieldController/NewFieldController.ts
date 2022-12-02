import {ModalController} from '../ModalController';
import {NewFieldView} from './NewFieldView';

export class NewFieldController extends ModalController {
    getViewClass() {
        return NewFieldView;
    }
}
