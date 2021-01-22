class TreeWidget2 extends ReactComponent {
    onDivMouseDown = e => {
        console.log('TreeWidget2.onDivMouseDown', e.currentTarget);
    }
    onNodeMouseDown = e => {
        console.log('TreeWidget2.onNodeMouseDown', e.currentTarget);
        e.stopPropagation();
    }
    renderItems(items) {
        return items.map(item => {
            return <li key={item.title} className={'opened'}>
                <div onMouseDown={this.onDivMouseDown}>
                    <span className={'node'} onMouseDown={this.onNodeMouseDown}/>
                    &nbsp;
                    <span>{item.title}</span>
                </div>
                {item.items &&
                    <ul style={{paddingLeft: 15}}>
                        {this.renderItems(item.items)}
                    </ul>
                }
            </li>
        });
    }
    render() {
        console.log('TreeWidget2.render', this.props.items);
        return <div className={'TreeWidget2'}>
            <ul style={{paddingLeft: 5}}>
                {this.renderItems(this.props.items)}
            </ul>
        </div>;
    }
}
