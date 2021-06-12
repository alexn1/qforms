class GridCell extends ReactComponent {
    constructor(props) {
        super(props);
        this.span = React.createRef();
    }
    /*onClick = e => {
        console.log('GridCell.onClick', this.span.current);
        console.log('offsetWidth:', this.span.current.offsetWidth);
    }*/
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
            <div className="GridCell" /*onClick={this.onClick}*/>
                <span ref={this.span}>{this.renderCellValue(row[column.name])}</span>
            </div>
        );
    }
}

window.QForms.GridCell = GridCell;
