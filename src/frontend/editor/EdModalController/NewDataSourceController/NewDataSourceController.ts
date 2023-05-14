import { EdModalController } from '../EdModalController';
import { NewDataSourceView } from './NewDataSourceView';

export class NewDataSourceController extends EdModalController {
    getViewClass() {
        return NewDataSourceView;
    }
}
