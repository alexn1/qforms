import React from 'react';
import { EventEmitter } from '../EventEmitter';
import { View } from './View';
export declare abstract class Controller extends EventEmitter {
    view: View | null;
    onViewCreate: (view: View) => void;
    rerender(): Promise<void>;
    getView(): View<Controller>;
    getViewClass(): React.ComponentType<any>;
    createElement(): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}
