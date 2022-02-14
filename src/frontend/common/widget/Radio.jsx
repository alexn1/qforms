class Radio extends ReactComponent {
    constructor(props) {
        super(props);
        if (!props.name) throw new Error('no name');
        this.state = {value: null};

    }
    getValue() {
        return this.state.value;
    }
    renderItem(item, i) {
        return [
            <input type={'radio'} name={this.props.name} id={`${this.props.name}${i}`} value={item.value}/>,
            <label htmlFor={`${this.props.name}${i}`}>
                {item.title || item.value}
            </label>
        ];
    }
    render() {
        const items = this.props.items || [];
        return <div className={this.getCssClassNames()}>
            {items.map((item, i) => this.renderItem(item, i))}
        </div>;
    }
}
