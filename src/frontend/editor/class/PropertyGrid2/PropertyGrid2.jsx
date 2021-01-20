class PropertyGrid2 extends ReactComponent {
    renderInput(name) {
        const obj = this.props.obj;
        return <TextBox name={name} value={obj[name]} spellCheck="false"/>;
    }
    renderSelect(name) {
        const obj     = this.props.obj;
        const options = this.props.options;
        return <ComboBox
            name={name}
            value={obj[name]}
            items={options[name].map(value => ({
                value: value,
                title: value
            }))}
        />;
    }
    renderRows() {
        const obj     = this.props.obj;
        const options = this.props.options;
        return Object.keys(obj).map(name => <tr key={name}>
            <td>{name}</td>
            <td>
                {options && options[name] !== undefined ? this.renderSelect(name) : this.renderInput(name)}
            </td>
        </tr>);
    }
    render() {
        return <div className={'PropertyGrid2'}>
            <table>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        </div>
    }
}
