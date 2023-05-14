import { ModalController } from '../EdModalController';
import { NewDataSourceView } from './NewDataSourceView';

export class NewDataSourceController extends ModalController {
    getViewClass() {
        return NewDataSourceView;
    }
}
