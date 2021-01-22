class TreeItem2 extends ReactComponent {
    onDivMouseDown = e => {
        console.log('TreeItem2.onDivMouseDown', e.currentTarget);
        this.props.tree.select(this.props.item);
    }
    onNodeMouseDown = e => {
        console.log('TreeItem2.onNodeMouseDown', e.currentTarget);
        e.stopPropagation();
    }
    isSelected() {
        return this.props.tree.state.selectedItem === this.props.item;
    }
    render() {
        const item = this.props.item;
        const tree = this.props.tree;
        return <li key={item.title} className={'opened'}>
            <div onMouseDown={this.onDivMouseDown} className={this.isSelected() ? 'active' : null}>
                <span className={'node'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span>{item.title}</span>
            </div>
            {item.items &&
            <ul style={{paddingLeft: 15}}>
                {item.items.map(item => <TreeItem2 key={item.title} tree={tree} item={item}/>)}
            </ul>
            }
        </li>;
    }
}
