import { Controller } from '../Controller';
import { ConfirmView } from './ConfirmView';
export declare class ConfirmController extends Controller {
    options: any;
    constructor(options: any);
    getViewClass(): typeof ConfirmView;
    close(result: boolean): void;
    onYesClick: (e: any) => void;
    onCloseClick: (e: any) => void;
    onKeyDown: (e: any) => Promise<void>;
}
