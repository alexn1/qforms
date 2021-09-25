class PropertyGrid extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getObj() {
        if (this.state.object) {
            return this.state.object.obj;
        }
        return null;
    }
    getOptions() {
        if (this.state.object) {
            return this.state.object.options;
        }
        return null;
    }
    onChange = (name, value) => {
        // console.log('PropertyGrid.onChange', name, value);
        if (this.props.onChange) {
            this.props.onChange(name, value);
        }
    }
    renderInput(name) {
        const obj = this.getObj();
        return <TextBox
            name={name}
            value={obj[name]}
            spellCheck="false"
            onChange={value => this.onChange(name, value)}
            autocomplete={'off'}
        />;
    }
    renderSelect(name) {
        const obj     = this.getObj();
        const options = this.getOptions();
        return <ComboBox
            name={name}
            value={obj[name]}
            items={options[name].map(value => ({
                value: value,
                title: value
            }))}
            onChange={value => this.onChange(name, value)}
        />;
    }
    renderRows() {
        const obj     = this.getObj();
        const options = this.getOptions();
        return Object.keys(obj).map(name => <tr key={name}>
            <td>{name}</td>
            <td>
                {options[name] !== undefined ? this.renderSelect(name) : this.renderInput(name)}
            </td>
        </tr>);
    }
    render() {
        return <div className={'PropertyGrid full'}>
            <div className={'frame full'}>
                <div className={'frame__container'}>
                    <table className={'PropertyGrid__table'} cellPadding={0} cellSpacing={0}>
                        <tbody>
                            {this.getObj() && this.renderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
}
