import { ModalController } from '../ModalController';
import { NewFormFromTableView } from './NewFormFromTableView';

export class NewFormFromTableController extends ModalController {
    getViewClass() {
        return NewFormFromTableView;
    }
}
