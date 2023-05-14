import { ModalController } from '../EdModalController';
import { NewFieldView } from './NewFieldView';

export class NewFieldController extends ModalController {
    getViewClass() {
        return NewFieldView;
    }
}
