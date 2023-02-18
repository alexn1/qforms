import * as React from 'react';
import { ReactComponent } from '../../ReactComponent';
import { JSONString } from '../../../../types';
export declare class GridCell extends ReactComponent {
    span: React.RefObject<any>;
    constructor(props: any);
    getSpanOffsetWidth(): any;
    renderCellValue(rawValue: JSONString): any;
    render(): JSX.Element;
}
