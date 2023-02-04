import React from 'react';
import { RowFormFieldView } from '../RowFormFieldView';
import { RowFormFileFieldController } from './RowFormFileFieldController';
import './RowFormFileFieldView.less';
export declare class RowFormFileFieldView<T extends RowFormFileFieldController> extends RowFormFieldView<T> {
    image: React.RefObject<any>;
    div: React.RefObject<any>;
    input: React.RefObject<any>;
    constructor(props: any);
    getImage(): any;
    getDiv(): any;
    getInput(): any;
    updateSize(): void;
    onClearClick: (e: any) => void;
    onChange: (e: any) => Promise<void>;
    onImageClick: (e: any) => Promise<void>;
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    onImageIconClick: (e: any) => Promise<void>;
}
