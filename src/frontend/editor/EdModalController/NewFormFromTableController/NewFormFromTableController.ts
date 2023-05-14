import { ModalController } from '../EdModalController';
import { NewFormFromTableView } from './NewFormFromTableView';

export class NewFormFromTableController extends ModalController {
    getViewClass() {
        return NewFormFromTableView;
    }
}
