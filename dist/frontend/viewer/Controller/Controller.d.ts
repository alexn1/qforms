import React from 'react';
import { EventEmitter } from '../EventEmitter';
export declare abstract class Controller extends EventEmitter {
    view: any;
    onViewCreate: (view: any) => void;
    rerender(): Promise<any>;
    getView(): any;
    getViewClass(): void;
    createElement(): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
}
