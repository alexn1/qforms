import React from 'react';
import { ReactComponent } from '../../ReactComponent';
import './Image.less';
export declare class Image extends ReactComponent {
    img: React.RefObject<any>;
    constructor(props: any);
    getNaturalSize(): any[];
    onImgClick: (e: any) => Promise<any>;
    render(): JSX.Element;
}
