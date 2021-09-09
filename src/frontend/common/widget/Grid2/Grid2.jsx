class Grid2 extends ReactComponent {
    renderColumns() {
        return this.props.columns.map(column => {
            return <div key={column.name} className={`${this.constructor.name}__cell`}>{column.name}</div>;
        });
    }
    renderRows() {
        return this.props.rows.map(row => {
            const i = this.props.rows.indexOf(row);
            return <a key={i.toString()} className={`${this.constructor.name}__row Grid2__row__hover`} href="xyz">
                {this.props.columns && this.props.columns.map(column => {
                    return <div key={column.name} className={`${this.constructor.name}__cell`}>{row[column.name]}</div>;
                })}
            </a>;
        })
    }
    render() {
        return <div className={this.getClassName()}>
            <div className={`${this.constructor.name}__head`}>
                <div className={`${this.constructor.name}__table`}>
                    <div className={`${this.constructor.name}__row`}>
                        {this.props.columns && this.renderColumns()}
                        <div style={{display: 'table-cell', boxSizing: 'border-box'}}>&nbsp;</div>
                    </div>
                </div>
            </div>
            <div className={`${this.constructor.name}__body`}>
                <div className={`${this.constructor.name}__table`}>
                    {this.props.rows && this.renderRows()}
                </div>
            </div>
        </div>;
    }
}
