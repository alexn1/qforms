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
    render() {
        const row = this.props.row;
        const column = this.props.column;
        return (
            <div className="GridCell" /*onClick={this.onClick}*/>
                <span ref={this.span}>{row[column.name]}</span>
            </div>
        );
    }
}
