class Radio extends ReactComponent {
    constructor(props) {
        console.log('Radio.constructor', props.value);
        super(props);
        if (!props.name) throw new Error('no name');
        this.state = {
            value: this.getInitialValue()
        };
        console.log('value:', this.getValue());
    }
    getInitialValue() {
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.props.items.find(item => item.value === this.props.value);
            if (!item) {
                console.error(`no item for value:`, this.props.value, typeof this.props.value);
                console.log('items:', this.props.items);
            }
        }
        return value;
    }
    getValue() {
        return this.state.value;
    }
    onChange = async e => {
        // console.log('Radio.onChange', e.target.value);
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            await this.props.onChange(e.target.value);
        }
    }
    renderItem(item, i) {
        return [
            <input type={'radio'} name={this.props.name} id={`${this.props.name}${i}`} value={item.value} onChange={this.onChange} checked={item.value === this.getValue()}/>,
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
