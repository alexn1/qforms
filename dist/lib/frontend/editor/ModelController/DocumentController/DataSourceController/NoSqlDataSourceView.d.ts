import * as React from 'react';
import { DocumentView } from '../DocumentView';
import './NoSqlDataSourceView.less';
export declare class NoSqlDataSourceView extends DocumentView {
    selectRef: React.RefObject<any>;
    countRef: React.RefObject<any>;
    selectQuery: any;
    countQuery: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    isChanged(): boolean;
    onChange: (i: any, o: any) => Promise<void>;
    getButtonClass(name: any): "btn-primary" | "btn-default";
    getVisibility(name: any): "hidden" | "visible";
    onSaveClick: (e: any) => Promise<void>;
    isSelected(name: any): boolean;
    render(): JSX.Element;
}
