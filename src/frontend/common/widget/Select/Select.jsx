class Select extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            visible: false,
        };
    }
    getVisibility() {
        return this.state.visible ? 'visible' : 'hidden';
    }
    onInputClick = async e => {
        console.log('Select.onInputClick');
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
        // console.log('Select.onDropdownClick', e.target);

        const value = JSON.parse(e.target.dataset.value);
        console.log('value:', value);

        this.setState({value: value, visible: false}, () => {

        });
    }
    getItems() {
        return this.props.items || [];
    }
    render() {
        return <div className={this.getCssClassNames()}>
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


            <ul className={`${this.getCssBlockName()}__dropdown`}
                style={{visibility: this.getVisibility()}}
                onMouseDown={this.onDropdownMouseDown}
                onClick={this.onDropdownClick}
            >
                <li className={`${this.getCssBlockName()}__item`} data-value={'""'}>&nbsp;</li>
                {this.getItems().map(item => {
                    return <li key={item.value}
                               className={`${this.getCssBlockName()}__item`}
                               data-value={JSON.stringify(item.value)}
                    >{item.title || item.value}</li>;
                })}
            </ul>
        </div>;
    }
}
