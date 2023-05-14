import { ModalController } from '../EdModalController';
import { NewParamView } from './NewParamView';

export class NewParamController extends ModalController {
    getViewClass() {
        return NewParamView;
    }
}
