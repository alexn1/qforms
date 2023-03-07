import * as React from 'react';
import { DocumentView } from '../DocumentView';
import './SqlDataSourceView.less';
import { Visibility } from '../../../../viewer';
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
    getButtonClass(name: string): string;
    getVisibility(name: string): Visibility;
    onSaveClick: (e: any) => Promise<void>;
    isSelected(name: any): boolean;
    render(): JSX.Element;
}
