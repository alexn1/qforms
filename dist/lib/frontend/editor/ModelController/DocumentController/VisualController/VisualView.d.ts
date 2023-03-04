import * as React from 'react';
import { DocumentView } from '../DocumentView';
import './VisualView.less';
export declare class VisualView extends DocumentView {
    textarea: React.RefObject<any>;
    cm: any;
    constructor(props: any);
    getTextarea(): any;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onControllerSave: (e: any) => Promise<void>;
    onChange: (instance: any, changeObj: any) => Promise<void>;
    isChanged(): boolean;
    render(): JSX.Element;
}
