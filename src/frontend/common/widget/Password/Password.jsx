class Password extends ReactComponent {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.state = {
            value: this.props.value || '',
            type: 'password'
        };
    }
    getValue() {
        return this.state.value;
    }
    _setValue(value) {
        this.state.value = value;
        this.forceUpdate();
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }
    onChange = e => {
        this._setValue(e.target.value);
    }
    onCloseClick = e => {
        this._setValue('');
        this.getElement().focus();
    }
    shouldComponentUpdate(nextProps, nextState) {
        this.state.value = nextProps.value;
        return true;
    }
    isCloseVisible() {
        return this.state.value !== '';
    }
    render() {
        return <div className={this.getCssClassNames()}>
            <input ref={this.el}
                className={`${this.getCssBlockName()}__input`}
                type={this.state.type}
                   id={this.props.id}
                   name={this.props.name}
                   readOnly={this.props.readOnly}
                   disabled={this.props.disabled}
                   placeholder={this.props.placeholder}
                   autoFocus={this.props.autoFocus}
                   spellCheck={this.props.spellCheck}
                   autoComplete={this.props.autocomplete}
                   value={this.state.value}
                   onFocus={this.props.onFocus}
                   onBlur={this.props.onBlur}
                   onChange={this.onChange}
            />
            <div className={`${this.getCssBlockName()}__close ${this.isCloseVisible() ? 'visible' : ''}`}
                 onClick={this.onCloseClick}>
                <CloseIcon/>
            </div>
        </div>;
    }
}
