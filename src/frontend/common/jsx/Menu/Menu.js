class Menu extends React.Component {
    constructor(props) {
        console.log('Menu.constructor', props);
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
        this.onBlur  = this.onBlur.bind(this);
    }
    onClick(e) {
        console.log('Menu.onClick', e.currentTarget.dataset.name);
        this.setState({[e.currentTarget.dataset.name]: true});
    }
    onBlur(e) {
        console.log('Menu.onBlur', e.currentTarget.dataset.name);
        this.setState({[e.currentTarget.dataset.name]: false});
    }
    render() {
        return (
            <div className='Menu'>
                {this.props.items.map(menu => <div key={menu.name} className={this.state[menu.name] ? 'active' : ''}>
                    <button data-name={menu.name} onClick={this.onClick} onBlur={this.onBlur}>{menu.title}</button>
                    <div>
                        {menu.items.map(item =>
                            <a key={item.name} data-page={item.name}>{item.title}</a>
                        )}
                    </div>
                </div>)}
            </div>
        );
    }
}
