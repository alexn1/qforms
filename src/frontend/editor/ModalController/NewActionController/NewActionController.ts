import {ModalController} from '../ModalController';
import {NewActionView} from './NewActionView';

export class NewActionController extends ModalController {
    getViewClass() {
        return NewActionView;
    }
}
