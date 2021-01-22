class TreeItem2 extends ReactComponent {
    onDivMouseDown = e => {
        console.log('TreeItem2.onDivMouseDown', e.currentTarget);
    }
    onNodeMouseDown = e => {
        console.log('TreeItem2.onNodeMouseDown', e.currentTarget);
        e.stopPropagation();
    }
    render() {
        const item = this.props.item;
        return <li key={item.title} className={'opened'}>
            <div onMouseDown={this.onDivMouseDown}>
                <span className={'node'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span>{item.title}</span>
            </div>
            {item.items &&
            <ul style={{paddingLeft: 15}}>
                {item.items.map(item => <TreeItem2 key={item.title} item={item}/>)}
            </ul>
            }
        </li>;
    }
}
