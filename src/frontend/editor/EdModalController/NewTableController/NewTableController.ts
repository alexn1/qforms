import { EdModalController } from '../EdModalController';
import { NewTableView } from './NewTableView';

export class NewTableController extends EdModalController {
    getViewClass() {
        return NewTableView;
    }
}
