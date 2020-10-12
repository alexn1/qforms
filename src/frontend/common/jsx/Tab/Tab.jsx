class Tab extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
    }
    onLiMouseDown = e => {
        // console.log('Tab.onLiMouseDown', e.currentTarget.dataset.i);
        const i = parseInt(e.currentTarget.dataset.i);
        this.setState({active: i});
    }
    renderTitles() {
        return this.props.tabs.map((tab, i) =>
        <li
            key={tab.name}
            className={i === this.state.active ? 'active' : null}
            onMouseDown={this.onLiMouseDown}
            data-i={i}
        >
            <span>{tab.title}</span>
        </li>);
    }
    renderContents() {
        return this.props.tabs.map((tab, i) =>
        <div key={tab.name} className={i === this.state.active ? 'active' : null}>
            {tab.content}
        </div>);
    }
    render() {
        return (
            <div className="Tab Tab-blue" style={{height: '120px'}}>
                <ul>
                    {this.props.tabs && this.renderTitles()}
                </ul>
                <div>
                    {this.props.tabs && this.renderContents()}
                </div>
            </div>
        );
    }
}
