import { Controller } from '../Controller';
import { AlertView } from './AlertView';
export declare class AlertController extends Controller {
    options: any;
    constructor(options: any);
    getViewClass(): typeof AlertView;
    close(): void;
    onOkButtonClick: (e: any) => Promise<void>;
    onCloseClick: (e: any) => Promise<void>;
    onKeyDown: (e: any) => Promise<void>;
}
