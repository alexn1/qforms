class PropertyGrid2 extends ReactComponent {
    renderRows() {
        const  obj = this.props.obj;
        return Object.keys(obj).map(name => {
            return <tr key={name}>
                <td>{name}</td>
                <td>
                    <input name={name} spellCheck="false" value={obj[name]}/>
                </td>
            </tr>;
        });
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
