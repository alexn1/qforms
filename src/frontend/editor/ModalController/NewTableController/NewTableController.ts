import {ModalController} from '../ModalController';
import {NewTableView} from './NewTableView';

export class NewTableController extends ModalController {
    getViewClass() {
        return NewTableView;
    }
}
