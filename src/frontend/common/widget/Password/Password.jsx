class Password extends ReactComponent {
    render() {
        return <div className={this.getCssClassNames()}>
            <input
                className={`${this.getCssBlockName()}__input`}
                type={'password'}
            />
        </div>;
    }
}
