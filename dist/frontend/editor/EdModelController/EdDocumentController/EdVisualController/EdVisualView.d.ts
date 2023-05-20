import * as React from 'react';
import { EdDocumentView } from '../EdDocumentView';
import './EdVisualView.less';
export declare class EdVisualView extends EdDocumentView {
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
