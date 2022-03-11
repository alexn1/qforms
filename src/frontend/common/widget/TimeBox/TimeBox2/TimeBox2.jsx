class TimeBox2 extends TimeBox {
    isCloseVisible() {
        return !!this.state.value;
    }
    onCloseDown = e => {
        this.setState({value: ''}, () => {
            if (this.props.onChange) {
                this.props.onChange('');
            }
        });
    }
    render() {
        return <div ref={this.el} className={this.getCssClassNames()}>
            <input className={`${this.getCssBlockName()}__input`}
                type={'text'}
                // id={this.props.id}
                readOnly={this.props.readOnly}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                // onKeyUp={this.onKeyUp}
                onKeyPress={this.onKeyPress}
                onBlur={this.onBlur}
            />
            <div className={`${this.getCssBlockName()}__close-icon ${this.isCloseVisible() ? 'visible' : ''}`} onMouseDown={this.onCloseDown}>
                <CloseIcon/>
            </div>
            <div className={`${this.getCssBlockName()}__time-icon`}>
                <TimeIcon/>
            </div>
        </div>;
    }
}
