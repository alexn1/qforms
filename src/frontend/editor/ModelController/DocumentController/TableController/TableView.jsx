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
        const ctrl = this.props.ctrl;
        return <div className={this.getCssClassNames()}>
            <div className="client frame">
                <div className="frame__container flex-column">
                    <Grid
                        classList={['flex-max']}
                        columns={[
                            {name: 'name', title: 'name', width: 100},
                            {name: 'caption', title: 'caption', width: 100},
                            {name: 'type', title: 'type', width: 60},
                            {name: 'key', title: 'key', width: 60},
                            {name: 'auto', title: 'auto', width: 60},
                            {name: 'nullable', title: 'nullable', width: 60},
                        ]}
                        rows={ctrl.columns.map(column => column.model.getAttributes())}
                        getRowKey={row => row.name}
                    />
                    <Button onClick={ctrl.onCreateFormButtonClick}>Create Form</Button>
                </div>
            </div>
        </div>;
    }
}
