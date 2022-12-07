import { ModalController } from '../ModalController';
import { NewFormView } from './NewFormView';

export class NewFormController extends ModalController {
    getViewClass() {
        return NewFormView;
    }
}
