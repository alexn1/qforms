class Select extends ReactComponent {
    constructor(props) {
        super(props);
        this.el       = React.createRef();
        this.dropdown = React.createRef();
        this.state = {
            value  : this.getInitialValue(),
            visible: false,
        };
    }
    getInitialValue() {
        // console.log('Select.getInitialValue', this.props.value);
        let value = null;
        if (this.props.value !== undefined && this.props.value !== null) {
            value = this.props.value;
            const item = this.getItems().find(item => item.value === this.props.value);
            if (!item) {
                if (this.isNullable() && value === '') {
                } else {
                    console.error(`no item for value:`, this.props.value, typeof this.props.value);
                    console.log('items:', this.getItems());
                }
            }
        } else {
            if (this.isNullable()) {
                value = '';
            } else {
                if (this.props.items.length) {
                    value = this.props.items[0].value;
                } else {
                    value = '';
                }
            }
        }
        if (value === null) throw new Error('null is wrong value for Select');
        // console.log('select value:', value);
        return value;
    }
    getValue() {
        return this.state.value;
    }
    isNullable() {
        return this.props.nullable !== undefined ? this.props.nullable : true;
    }
    getVisibility() {
        return this.state.visible ? 'visible' : 'hidden';
    }
    onInputMouseDown = async e => {
        if (this.props.readOnly) return;
        if (this.props.onMouseDown) {
            await this.props.onMouseDown(e);
        } else {
            if (!this.state.visible) {
                const [selected] = this.el.current.querySelectorAll('li.selected');
                // console.log('selected:', selected);
                if (selected) {
                    // console.log('selected.offsetTop:', selected.offsetTop);
                    const scrollTop = selected.offsetTop
                        - this.dropdown.current.getBoundingClientRect().height / 2
                        + selected.getBoundingClientRect().height / 2;
                    console.log('scrollTop:', scrollTop);
                    this.dropdown.current.scrollTop = scrollTop;
                    console.log('this.dropdown.current.scrollTop', this.dropdown.current.scrollTop);
                }
            }
            this.setState(prevState => {
                return {visible: !prevState.visible};
            });
        }
    }
    onInputBlur = async e => {
        console.log('Select.onInputBlur', e.target);
        this.setState({visible: false});
    }
    onDropdownMouseDown = async e => {
        e.preventDefault();
    }
    onDropdownClick = async e => {
        console.log('Select.onDropdownClick', e.target.offsetTop);
        const value = JSON.parse(e.target.dataset.value);
        // console.log('value:', value);
        this.setState({value: value, visible: false}, async () => {
            if (this.props.onChange) {
                await this.props.onChange(value.toString());
            }
        });
    }
    getItems() {
        return this.props.items || [];
    }
    getValueTitle(value) {
        if (value === '') return '';
        const item = this.getItems().find(item => item.value === value);
        if (!item) throw new Error(`cannot find item by value: ${value}`);
        // console.log('item:', item);
        return item.title || item.value;
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Select.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        this.state.value = nextProps.value;
        return true;
    }
    render() {
        // console.log('Select.render', this.state.value, this.getValueTitle(this.state.value));
        return <div ref={this.el} className={this.getCssClassNames()}>
            <input className={`${this.getCssBlockName()}__input`}
                   readOnly={true}
                   disabled={this.props.readOnly}
                   placeholder={this.props.placeholder}
                   onBlur={this.onInputBlur}
                   value={this.getValueTitle(this.getValue())}
                   onMouseDown={this.onInputMouseDown}
            />
            <div className={`${this.getCssBlockName()}__clear`}>
                <CloseIcon/>
            </div>
            <div className={`${this.getCssBlockName()}__icon ${this.state.visible ? 'Select__icon_up' : ''}`}>
                <ArrowIcon/>
            </div>
            <ul ref={this.dropdown} className={`${this.getCssBlockName()}__dropdown`}
                style={{visibility: this.getVisibility()}}
                onMouseDown={this.onDropdownMouseDown}
                onClick={this.onDropdownClick}
            >
                {this.isNullable() &&
                    <li className={`${this.getCssBlockName()}__item`} data-value={'""'}>&nbsp;</li>
                }
                {this.getItems().map(item => {
                    return <li key={item.value}
                               className={`${this.getCssBlockName()}__item ${this.getValue() === item.value ? 'selected' : ''}`}
                               data-value={JSON.stringify(item.value)}
                    >{item.title || item.value}</li>;
                })}
            </ul>
        </div>;
    }
}
