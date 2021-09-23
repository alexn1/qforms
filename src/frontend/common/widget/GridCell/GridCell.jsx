class GridCell extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        return this.span.current.offsetWidth;
    }
    renderCellValue(value) {
        if (typeof value === 'boolean') return value.toString();
        return value;
    }
    render() {
        const row = this.props.row;
        const column = this.props.column;
        return (
            <div className={this.getCssClassNames()}>
                <span ref={this.span}>{this.renderCellValue(row[column.name])}</span>
            </div>
        );
    }
}

window.QForms.GridCell = GridCell;
