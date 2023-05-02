/// <reference types="react" />
import { ReactComponent } from '../../common';
import './PropertyGrid.less';
export declare class PropertyGrid extends ReactComponent {
    constructor(props: any);
    getObj(): any;
    getOptions(): any;
    onChange: (name: any, value: any) => void;
    renderInput(name: any): JSX.Element;
    renderSelect(name: any): JSX.Element;
    renderRows(): JSX.Element[];
    render(): JSX.Element;
}
