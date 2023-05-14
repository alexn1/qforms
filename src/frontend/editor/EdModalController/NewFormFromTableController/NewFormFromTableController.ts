import { EdModalController } from '../EdModalController';
import { NewFormFromTableView } from './NewFormFromTableView';

export class NewFormFromTableController extends EdModalController {
    getViewClass() {
        return NewFormFromTableView;
    }
}
