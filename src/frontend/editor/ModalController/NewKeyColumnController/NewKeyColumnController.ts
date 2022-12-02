import {ModalController} from '../ModalController';
import {NewKeyColumnView} from './NewKeyColumnView';

export class NewKeyColumnController extends ModalController {
    getViewClass() {
        return NewKeyColumnView;
    }
}