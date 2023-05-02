import { Controller } from '../Controller';
export declare class ModalController extends Controller {
    options: any;
    constructor(options?: any);
    getId(): any;
    getApp(): any;
    close(): Promise<void>;
}
