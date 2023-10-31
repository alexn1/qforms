import { FrontHostApp } from '../../FrontHostApp';
import { ReactComponent, ReactComponentProps } from '../../ReactComponent';

import './Menu.less';

export interface MenuProps extends ReactComponentProps {
    items: any[];
    onClick: any;
    hostApp: FrontHostApp;
}

export class Menu extends ReactComponent<MenuProps> {
    constructor(props: MenuProps) {
        // console.debug('Menu.constructor', props);
        super(props);
        this.state = {};
    }

    onMenuClick = async (e) => {
        // console.debug('Menu.onMenuClick', e.currentTarget.dataset.menu);
        await this.toggleMenu(e.currentTarget.dataset.menu);
    };

    onBlur = async (e) => {
        // console.debug('Menu.onBlur', e.currentTarget.dataset.menu);
        await this.closeMenu(e.currentTarget.dataset.menu);
    };

    toggleMenu(menu) {
        return new Promise<void>((resolve) => {
            this.setState(
                (prevState) => ({
                    [menu]: !prevState[menu],
                }),
                resolve,
            );
        });
    }

    closeMenu(menu) {
        return new Promise<void>((resolve) => this.setState({ [menu]: false }, resolve));
    }

    onMouseDown = (e) => {
        // console.debug('Menu.onMouseDown');
        e.preventDefault();
        // e.stopPropagation();
        // return false;
    };

    onMenuItemClick = async (e) => {
        // console.debug('Menu.onMenuItemClick', e.target.dataset.menu, e.target.dataset.item);
        e.persist();
        const { menu, type, name } = e.target.dataset;
        await this.closeMenu(menu);
        if (this.props.onClick) {
            this.props.onClick(menu, type, name);
        }
    };

    render() {
        return (
            <div className="Menu">
                {this.props.items &&
                    this.props.items.map((menu) => (
                        <div
                            key={menu.name}
                            className={this.state[menu.name] ? 'active' : undefined}>
                            <button
                                data-menu={menu.name}
                                onClick={this.onMenuClick}
                                onBlur={this.onBlur}>
                                {menu.title}
                            </button>
                            <div onMouseDown={this.onMouseDown} onClick={this.onMenuItemClick}>
                                {menu.items.map((item) => (
                                    <a
                                        key={item.name}
                                        href={this.props.hostApp.createLink({ page: item.name })}
                                        data-menu={menu.name}
                                        data-type={item.type}
                                        data-name={item.name}>
                                        {item.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Menu = Menu;
}
