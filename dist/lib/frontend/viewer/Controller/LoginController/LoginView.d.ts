import React from 'react';
import { View } from '../View';
export declare class LoginView extends View {
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
