import { ModalController } from '../EdModalController';
import { NewTableView } from './NewTableView';

export class NewTableController extends ModalController {
    getViewClass() {
        return NewTableView;
    }
}
