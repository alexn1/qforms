import { ReactComponent } from '../../common';
import { Controller } from './Controller';
export declare abstract class View<T extends Controller> extends ReactComponent {
    constructor(props: any);
    getCtrl(): T;
}
