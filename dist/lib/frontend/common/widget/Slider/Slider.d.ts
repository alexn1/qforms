/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
export declare class Slider extends ReactComponent {
    constructor(props: any);
    onPrevClick: (e: any) => void;
    onNextClick: (e: any) => void;
    onImageClick: (e: any) => void;
    onCloseClick: (e: any) => void;
    render(): JSX.Element;
}
