import * as React from 'react';
import { ReactComponent } from '../../ReactComponent';
export declare class GridCell extends ReactComponent {
    span: React.RefObject<any>;
    constructor(props: any);
    getSpanOffsetWidth(): any;
    renderCellValue(rawValue: any): any;
    render(): JSX.Element;
}
