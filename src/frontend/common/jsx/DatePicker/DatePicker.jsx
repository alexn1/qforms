class DatePicker extends React.Component {
    constructor(props) {
        console.log('DatePicker.constructor', props);
        super(props);
        if (props.cb) props.cb(this);
    }
    render() {
        return (
            <table className="DatePicker" cellSpacing="0" cellPadding="0">
                <caption>
                    <div>
                        <a className="prev"> &lt; </a>
                        <span/>
                        <a className="next"> &gt; </a>
                    </div>
                </caption>
                <thead>
                <tr>
                    <th>Пн</th>
                    <th>Вт</th>
                    <th>Ср</th>
                    <th>Чт</th>
                    <th>Пт</th>
                    <th className="weekend">Сб</th>
                    <th className="weekend">Вс</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="weekend"></td>
                    <td className="weekend"></td>
                </tr>
                </tbody>
            </table>
        );
    }
}
