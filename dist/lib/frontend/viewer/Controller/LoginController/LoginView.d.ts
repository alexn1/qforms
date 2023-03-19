import React from 'react';
import { View } from '../View';
import './LoginView.less';
import { LoginController } from './LoginController';
export declare class LoginView<T extends LoginController = LoginController> extends View<T> {
    errMsgRef: React.RefObject<any>;
    constructor(props: any);
    onLoginFormSubmit: (e: any) => void;
    renderLogo(): any;
    renderTitle(): any;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
declare global {
    interface Window {
        LoginView: typeof LoginView;
    }
}
