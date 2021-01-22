class TreeWidget2 extends ReactComponent {
    render() {
        return <div className={'TreeWidget2'}>
            <ul>
                <li className={'opened'}>
                    <div style={{paddingLeft: 5}}>
                        <span className={'node'}></span>
                        &nbsp;
                        <span>admin</span>
                    </div>
                    <ul>
                        <li className={'opened'}>
                            <div style={{paddingLeft: 20}}>
                                <span className={'node'}></span>
                                &nbsp;
                                <span>Databases</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>;
    }
}
