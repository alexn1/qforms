import {ModalController} from '../ModalController';
import {NewColumnView} from './NewColumnView';

export class NewColumnController extends ModalController {
    getViewClass() {
        return NewColumnView;
    }
}
