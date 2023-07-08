import * as React from 'react';
import { EdDocumentView } from '../EdDocumentView';
import { Visibility } from '../../../../../types';
import './EdSqlDataSourceView.less';
export declare class EdSqlDataSourceView extends EdDocumentView {
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
    getButtonClass(name: string): string;
    getVisibility(name: string): Visibility;
    onSaveClick: (e: any) => Promise<void>;
    isSelected(name: string): boolean;
    render(): JSX.Element;
}
