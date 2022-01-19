class GridCell extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    getSpanOffsetWidth() {
        if (!this.span.current) return 0;
        return this.span.current.offsetWidth;
    }
    renderCellValue(rawValue) {
        const value = this.props.grid.props.decodeValue ? Helper.decodeValue(rawValue) : rawValue;
        if (typeof value === 'boolean') return value.toString();
        return value;
    }
    render() {
        const row = this.props.row;
        const column = this.props.column;
        return (
            <div className={`${this.getCssClassNames()} ellipsis`}>
                <span ref={this.span}>{this.renderCellValue(row[column.name])}</span>
            </div>
        );
    }
}

window.QForms.GridCell = GridCell;
