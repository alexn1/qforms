class Modal extends ReactComponent {
    render() {
        return (
            <div className="Modal">
                <div>{this.props.children}</div>
            </div>
        );
    }
}
