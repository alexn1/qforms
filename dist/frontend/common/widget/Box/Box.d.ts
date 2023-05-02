/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './Box.less';
export declare class Box extends ReactComponent {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    update: () => void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(): void;
    render(): JSX.Element;
}
