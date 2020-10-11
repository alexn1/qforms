class Grid extends ReactComponent {
    render() {
        return (
            <div className="Grid">
                <div className="head">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div>id</div>
                                    <span className="resize"></span>
                                </td>
                                <td>
                                    <div>created</div>
                                    <span className="resize"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="block"></div>
                <div className="body"></div>
            </div>
        );
    }
}
