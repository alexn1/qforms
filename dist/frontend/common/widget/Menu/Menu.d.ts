/// <reference types="react" />
import { FrontHostApp } from '../../FrontHostApp';
import { ReactComponent, ReactComponentProps } from '../../ReactComponent';
import './Menu.less';
export interface MenuProps extends ReactComponentProps {
    items: any[];
    onClick: any;
    hostApp: FrontHostApp;
}
export declare class Menu extends ReactComponent<MenuProps> {
    constructor(props: MenuProps);
    onMenuClick: (e: any) => Promise<void>;
    onBlur: (e: any) => Promise<void>;
    toggleMenu(menu: any): Promise<void>;
    closeMenu(menu: any): Promise<void>;
    onMouseDown: (e: any) => void;
    onMenuItemClick: (e: any) => Promise<void>;
    render(): JSX.Element;
}
