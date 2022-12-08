import { Controller } from '../Controller';
import { LoginView } from './LoginView';
export declare class LoginController extends Controller {
    frontHostApp: any;
    constructor(frontHostApp: any);
    static create(frontHostApp: any): any;
    getViewClass(): typeof LoginView;
    getText(): any;
    getFrontHostApp(): any;
    getViewClassCssBlockName(): string;
}
declare global {
    interface Window {
        LoginController: typeof LoginController;
    }
}
