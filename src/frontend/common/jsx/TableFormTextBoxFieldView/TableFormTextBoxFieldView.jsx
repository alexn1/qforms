class TableFormTextBoxFieldView extends ReactComponent {
    render() {
        const row = this.props.row;
        const columnName = this.props.columnName;
        return (
            <div className="TableFormTextBoxFieldView">
                <span>{row[columnName]}</span>
            </div>
        );
    }
}
