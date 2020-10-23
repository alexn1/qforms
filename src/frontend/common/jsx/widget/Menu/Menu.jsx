class Menu extends ReactComponent {
    constructor(props) {
        // console.log('Menu.constructor', props);
        super(props);
        this.state = {};
    }
    onMenuClick = async (e) => {
        // console.log('Menu.onMenuClick', e.currentTarget.dataset.menu);
        await this.toggleMenu(e.currentTarget.dataset.menu);
    }
    onBlur = async (e) => {
        // console.log('Menu.onBlur', e.currentTarget.dataset.menu);
        await this.closeMenu(e.currentTarget.dataset.menu);
    }
    toggleMenu(menu) {
        return new Promise(resolve => {
            this.setState(prevState => ({
                [menu]: !prevState[menu]
            }), resolve);
        });
    }
    closeMenu(menu) {
        return new Promise(resolve => this.setState({[menu]: false}, resolve));
    }
    onMouseDown = (e) => {
        // console.log('Menu.onMouseDown');
        e.preventDefault();
        // e.stopPropagation();
        // return false;
    }
    onMenuItemClick = async (e) => {
        // console.log('Menu.onMenuItemClick', e.target.dataset.menu, e.target.dataset.item);
        e.persist();
        await this.closeMenu(e.target.dataset.menu);
        if (this.props.onClick) {
            this.props.onClick(e.target.dataset.menu, e.target.dataset.item);
        }
    }
    render() {
        return (
            <div className="Menu">
                {this.props.items && this.props.items.map(menu => <div key={menu.name} className={this.state[menu.name] ? 'active' : null}>
                    <button data-menu={menu.name} onClick={this.onMenuClick} onBlur={this.onBlur}>{menu.title}</button>
                    <div onMouseDown={this.onMouseDown} onClick={this.onMenuItemClick}>
                        {menu.items.map(item =>
                            <a key={item.name} data-menu={menu.name} data-item={item.name}>{item.title}</a>
                        )}
                    </div>
                </div>)}
            </div>
        );
    }
}
