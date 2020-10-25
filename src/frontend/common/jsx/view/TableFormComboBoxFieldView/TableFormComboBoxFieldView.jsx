class TableFormComboBoxFieldView extends ReactComponent {
    render() {
        const row = this.props.row;
        const ctrl = this.props.ctrl;
        return (
            <div className="TableFormComboBoxFieldView">
                <span ref={this.span}>{ctrl.getValueForView(row)}</span>
            </div>
        );
    }
}