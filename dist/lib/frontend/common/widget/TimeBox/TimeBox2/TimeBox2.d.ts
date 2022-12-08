import React from 'react';
import { TimeBox } from '../TimeBox';
export declare class TimeBox2 extends TimeBox {
    inputEl: React.RefObject<any>;
    constructor(props: any);
    isCloseVisible(): boolean;
    onClear: (e: any) => void;
    getInputElement(): any;
    render(): JSX.Element;
}
