class TableView extends ReactComponent {
    renderRows() {
        const ctrl = this.props.ctrl;
        return ctrl.columns.map(column => <tr key={column.model.getName()}>
            <td>{column.model.getAttr('name')}</td>
            <td>{column.model.getAttr('caption')}</td>
            <td>{column.model.getAttr('type')}</td>
            <td>{column.model.getAttr('key')}</td>
            <td>{column.model.getAttr('auto')}</td>
            <td>{column.model.getAttr('nullable')}</td>
        </tr>);
    }
    render() {
        return <div className={this.getClassName()}>
            <div className="client place">
                <div className="frame">
                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>caption</th>
                                <th>type</th>
                                <th>key</th>
                                <th>auto</th>
                                <th>nullable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                    <br/>
                    <button className="btnCreateForm">Create Form</button>
                </div>
            </div>
        </div>;
    }
}
