import {ModalController} from '../ModalController';
import {NewParamView} from './NewParamView';

export class NewParamController extends ModalController {
    getViewClass() {
        return NewParamView;
    }
}