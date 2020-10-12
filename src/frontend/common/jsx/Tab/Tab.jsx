class Tab extends ReactComponent {
    render() {
        return (
            <div className="Tab Tab-blue" style={{height: '120px'}}>
                <ul>
                    <li className="active">
                        <span>Tab1</span>
                    </li>
                </ul>
                <div>
                    <div className="active">content1</div>
                </div>
            </div>
        );
    }
}
