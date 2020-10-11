class Grid extends ReactComponent {
    render() {
        return (
            <div className="Grid">
                <div className="head">
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width: '100px'}}>
                                    <div>id</div>
                                    <span className="resize"></span>
                                </td>
                                <td style={{width: '100px'}}>
                                    <div>created</div>
                                    <span className="resize"></span>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="block"></div>
                <div className="body">
                    <table>
                        <tbody>
                            <tr>
                                <td style={{width: '100px'}}>
                                    <div>1</div>
                                </td>
                                <td style={{width: '100px'}}>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                            <tr className="active">
                                <td className="active">
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <div>1</div>
                                </td>
                                <td>
                                    <div>2</div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
