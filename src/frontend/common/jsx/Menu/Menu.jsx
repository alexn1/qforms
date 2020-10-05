class Menu extends React.Component {
    constructor(props) {
        // console.log('Menu.constructor', props);
        super(props);
        this.state = {};
        this.onMenuClick     = this.onMenuClick.bind(this);
        this.onBlur          = this.onBlur.bind(this);
        this.onMouseDown     = this.onMouseDown.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        if (this.props.cb) {
            this.props.cb(this);
        }
    }
    onMenuClick(e) {
        // console.log('Menu.onMenuClick', e.currentTarget.dataset.menu);
        this.toggleMenu(e.currentTarget.dataset.menu);
    }
    onBlur(e) {
        // console.log('Menu.onBlur', e.currentTarget.dataset.menu);
        this.closeMenu(e.currentTarget.dataset.menu);
    }
    toggleMenu(menu) {
        // console.log('Menu.toggleMenu', menu);
        this.setState(prevState => ({
            [menu]: !prevState[menu]
        }));
    }
    closeMenu(menu) {
        this.setState({[menu]: false});
    }
    onMouseDown(e) {
        // console.log('Menu.onMouseDown');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    onMenuItemClick(e) {
        // console.log('Menu.onMenuItemClick', e.currentTarget.dataset.menu, e.currentTarget.dataset.item);
        this.closeMenu(e.currentTarget.dataset.menu);
        if (this.props.onClick) {
            this.props.onClick(e.currentTarget.dataset.menu, e.currentTarget.dataset.item);
        }
    }
    render() {
        return this.props.items.map(menu => <div key={menu.name} className={this.state[menu.name] ? 'active' : ''}>
            <button data-menu={menu.name} onClick={this.onMenuClick} onBlur={this.onBlur}>{menu.title}</button>
            <div>
                {menu.items.map(item =>
                    <a key={item.name} data-menu={menu.name} data-item={item.name}
                       onMouseDown={this.onMouseDown}
                       onClick={this.onMenuItemClick}
                    >{item.title}</a>
                )}
            </div>
        </div>);
    }
}
