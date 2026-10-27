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

export class Menu extends ReactComponent<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        // console.debug('Menu.constructor', props);
        super(props);
        this.el = React.createRef<HTMLDivElement>();
        this.state = {
            classList: [],
            enabled: true,
            disabled: false,
            openMenu: null,
        };
    }

    componentDidUpdate(prevProps: MenuProps, prevState: MenuState) {
        if (this.state.openMenu !== null && prevState.openMenu === null) {
            document.addEventListener('mousedown', this.onDocumentMouseDown);
            document.addEventListener('keydown', this.onDocumentKeyDown);
        } else if (this.state.openMenu === null && prevState.openMenu !== null) {
            this.removeDocumentListeners();
        }
    }

    componentWillUnmount() {
        this.removeDocumentListeners();
    }

    removeDocumentListeners() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown);
        document.removeEventListener('keydown', this.onDocumentKeyDown);
    }

    // closes the menu on outside click (button blur is not reliable: Safari/Firefox on macOS do not focus buttons on click)
    onDocumentMouseDown = (e: MouseEvent) => {
        const el = this.getElement() as HTMLDivElement | null;
        if (el && e.target instanceof Node && !el.contains(e.target)) {
            this.closeMenu();
        }
    };

    onDocumentKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            this.closeMenu();
        }
    };

    onMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // console.debug('Menu.onMenuClick', e.currentTarget.dataset.menu);
        const menu = e.currentTarget.dataset.menu!;
        this.setState((prevState) => ({
            openMenu: prevState.openMenu === menu ? null : menu,
        }));
    };

    // closes the menu when focus leaves the menu group (e.g. Tab)
    onGroupBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const next = e.relatedTarget;
        if (next instanceof Node && e.currentTarget.contains(next)) {
            return;
        }
        // relatedTarget is null when focus goes to a non-focusable element (outside click is handled by mousedown)
        if (next) {
            this.closeMenu();
        }
    };

    closeMenu() {
        this.setState({ openMenu: null });
    }

    // plain left click is handled by the app (SPA); modified clicks (ctrl/meta/shift/alt) are left to
    // the browser so "open in new tab/window" keeps working, as does the context menu
    onMenuItemClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        // console.debug('Menu.onMenuItemClick', e.currentTarget.dataset);
        const { menu, type, name } = e.currentTarget.dataset;
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
            return;
        }
        e.preventDefault();
        this.closeMenu();
        if (this.props.onClick) {
            try {
                await this.props.onClick(menu!, type!, name!);
            } catch (err) {
                console.error(err);
            }
        }
    };

    renderItem(menu: MenuGroup, item: MenuLinkItem) {
        const isPage = item.type === 'page';
        return (
            <a
                key={item.name}
                role="menuitem"
                // only pages have a real URL; actions/custom items must not navigate anywhere
                href={isPage ? this.props.hostApp.createLink({ page: item.name }) : '#'}
                data-menu={menu.name}
                data-type={item.type}
                data-name={item.name}
                onClick={this.onMenuItemClick}>
                {item.title}
            </a>
        );
    }

    renderGroup(menu: MenuGroup) {
        const isOpen = this.state.openMenu === menu.name;
        return (
            <div
                key={menu.name}
                className={isOpen ? 'active' : undefined}
                onBlur={this.onGroupBlur}>
                <button
                    data-menu={menu.name}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={this.onMenuClick}>
                    {menu.title}
                </button>
                <div role="menu">{menu.items.map((item) => this.renderItem(menu, item))}</div>
            </div>
        );
    }

    render() {
        return (
            <div className="Menu" ref={this.el}>
                {this.props.items && this.props.items.map((menu) => this.renderGroup(menu))}
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Menu = Menu;
}
