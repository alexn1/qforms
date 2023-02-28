import { ReactComponent } from '../../common';
import { Controller } from './Controller';
export declare abstract class View<TController extends Controller> extends ReactComponent {
    constructor(props: any);
    getCtrl(): TController;
}
