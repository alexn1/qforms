class DropDownIcon extends ReactComponent {
    render() {
        const size = this.props.size || 20;
        return <div className={this.getCssClassNames()} style={{width: size, height: size}}>
            <svg viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="5" style={{fill: 'gray'}}/>
                <polyline points="2,4 5,7 8,4" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>;
    }
}

window.QForms.DropDownIcon = DropDownIcon;
