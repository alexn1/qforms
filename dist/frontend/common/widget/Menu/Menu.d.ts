import React from 'react';
import { FrontHostApp } from '../../FrontHostApp';
import { ReactComponent, ReactComponentProps, ReactComponentState } from '../../ReactComponent';
import './Menu.less';
export interface MenuLinkItem {
    type: string;
    name: string;
    title: string;
}
export interface MenuGroup {
    name: string;
    title: string;
    items: MenuLinkItem[];
}
export interface MenuProps extends ReactComponentProps {
    items: MenuGroup[];
    onClick: (menu: string, type: string, name: string) => void | Promise<void>;
    hostApp: FrontHostApp;
}
interface MenuState extends ReactComponentState {
    openMenu: string | null;
}
export declare class Menu extends ReactComponent<MenuProps, MenuState> {
    constructor(props: MenuProps);
    componentDidUpdate(prevProps: MenuProps, prevState: MenuState): void;
    componentWillUnmount(): void;
    removeDocumentListeners(): void;
    onDocumentMouseDown: (e: MouseEvent) => void;
    onDocumentKeyDown: (e: KeyboardEvent) => void;
    onMenuClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onGroupBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
    closeMenu(): void;
    onMenuItemClick: (e: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
    renderItem(menu: MenuGroup, item: MenuLinkItem): JSX.Element;
    renderGroup(menu: MenuGroup): JSX.Element;
    render(): JSX.Element;
}
export {};
