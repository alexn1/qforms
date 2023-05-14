import { EdModalController } from '../EdModalController';
import { NewParamView } from './NewParamView';

export class NewParamController extends EdModalController {
    getViewClass() {
        return NewParamView;
    }
}
