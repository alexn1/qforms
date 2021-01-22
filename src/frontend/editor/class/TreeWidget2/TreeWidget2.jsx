class TreeWidget2 extends ReactComponent {
    renderItems(items, offset) {
        return items.map(item => {
            return <li key={item.title} className={'opened'}>
                <div style={{paddingLeft: offset}}>
                    <span className={'node'}/>&nbsp;<span>{item.title}</span>
                    {item.items &&
                        <ul>
                            {this.renderItems(item.items, offset + 15)}
                        </ul>
                    }
                </div>
            </li>
        });
    }
    render() {
        console.log('TreeWidget2.render', this.props.items);
        return <div className={'TreeWidget2'}>
            <ul>
                {this.renderItems(this.props.items, 5)}
                {/*<li className={'opened'}>
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
                </li>*/}
            </ul>
        </div>;
    }
}
