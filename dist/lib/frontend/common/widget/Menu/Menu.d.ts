/// <reference types="react" />
import { ReactComponent } from '../../ReactComponent';
import './Menu.less';
export declare class Menu extends ReactComponent {
    constructor(props: any);
    onMenuClick: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    toggleMenu(menu: any): Promise<void>;
    closeMenu(menu: any): Promise<void>;
    onMouseDown: (e: any) => void;
    onMenuItemClick: (e: any) => Promise<void>;
    render(): JSX.Element;
}
