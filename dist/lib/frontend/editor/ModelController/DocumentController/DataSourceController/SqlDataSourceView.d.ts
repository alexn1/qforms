import * as React from 'react';
import { DocumentView } from '../DocumentView';
import './SqlDataSourceView.less';
export declare class SqlDataSourceView extends DocumentView {
    singleRef: React.RefObject<any>;
    multipleRef: React.RefObject<any>;
    countRef: React.RefObject<any>;
    singleQuery: any;
    multipleQuery: any;
    countQuery: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    isChanged(): boolean;
    onChange: (i: any, o: any) => Promise<void>;
    getButtonClass(name: any): "btn-primary" | "btn-default";
    getVisibility(name: any): "visible" | "hidden";
    onSaveClick: (e: any) => Promise<void>;
    isSelected(name: any): boolean;
    render(): JSX.Element;
}
