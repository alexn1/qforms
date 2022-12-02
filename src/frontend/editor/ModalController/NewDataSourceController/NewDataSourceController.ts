import {ModalController} from '../ModalController';
import {NewDataSourceView} from './NewDataSourceView';

export class NewDataSourceController extends ModalController {
    getViewClass() {
        return NewDataSourceView;
    }
}
