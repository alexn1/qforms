class Select extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || '',
            visible: false,
        };
        this.el = React.createRef();
        this.dropdown = React.createRef();
    }
    getVisibility() {
        return this.state.visible ? 'visible' : 'hidden';
    }
    onInputClick = async e => {
        console.log('Select.onInputClick');
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
        this.setState({value: value.toString(), visible: false}, async () => {
            if (this.props.onChange) {
                await this.props.onChange(value.toString());
            }
        });
    }
    getItems() {
        return this.props.items || [];
    }
    render() {
        return <div ref={this.el} className={this.getCssClassNames()}>
            <input className={`${this.getCssBlockName()}__input`}
                   readOnly={true}
                   placeholder={'select'}
                   onClick={this.onInputClick}
                   onBlur={this.onInputBlur}
                   value={this.state.value}
            />
            <div className={`${this.getCssBlockName()}__icon ${this.state.visible ? 'Select__icon_down' : ''}`}>
                <svg width="10" height="6" viewBox="0 0 10 6">
                    <path d="M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z"/>
                </svg>
            </div>
            <ul ref={this.dropdown} className={`${this.getCssBlockName()}__dropdown`}
                style={{visibility: this.getVisibility()}}
                onMouseDown={this.onDropdownMouseDown}
                onClick={this.onDropdownClick}
            >
                <li className={`${this.getCssBlockName()}__item`} data-value={'""'}>&nbsp;</li>
                {this.getItems().map(item => {
                    return <li key={item.value}
                               className={`${this.getCssBlockName()}__item ${this.state.value === item.value.toString() ? 'selected' : ''}`}
                               data-value={JSON.stringify(item.value)}
                    >{item.title || item.value}</li>;
                })}
            </ul>
        </div>;
    }
}
