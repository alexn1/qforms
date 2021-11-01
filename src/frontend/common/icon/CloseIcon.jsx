class CloseIcon extends ReactComponent {
    render() {
        const strokeWidth = this.props.strokeWidth || 1;
        return <svg viewBox="0 0 10 10">
            <line x1="2" y1="2" x2="8" y2="8" stroke="#aaa" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
            <line x1="8" y1="2" x2="2" y2="8" stroke="#aaa" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
        </svg>;
    }
}
