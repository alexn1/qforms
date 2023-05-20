import * as React from 'react';
import { EdDocumentView } from '../EdDocumentView';
import { Visibility } from '../../../../../types';
import './EdNoSqlDataSourceView.less';
export declare class EdNoSqlDataSourceView extends EdDocumentView {
    selectRef: React.RefObject<any>;
    countRef: React.RefObject<any>;
    selectQuery: any;
    countQuery: any;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    isChanged(): boolean;
    onChange: (i: any, o: any) => Promise<void>;
    getButtonClass(name: string): string;
    getVisibility(name: string): Visibility;
    onSaveClick: (e: any) => Promise<void>;
    isSelected(name: any): boolean;
    render(): JSX.Element;
}
