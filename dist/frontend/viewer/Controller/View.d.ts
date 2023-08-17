import { ReactComponent, ReactComponentProps } from '../../common';
import { Controller } from './Controller';
export declare abstract class View<TController extends Controller = Controller> extends ReactComponent {
    constructor(props: ReactComponentProps);
    getCtrl(): TController;
}
