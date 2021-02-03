class TreeItem2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            opened: props.item.opened !== undefined ? props.item.opened : false
        };
    }
    onDivMouseDown = e => {
        // console.log('TreeItem2.onDivMouseDown', e.currentTarget);
        const item = this.props.item;
        const tree = this.props.tree;
        tree.select(item);
    }
    onDivDoubleClick = e => {
        // console.log('TreeItem2.onDivDoubleClick');
        const item = this.props.item;
        const tree = this.props.tree;
        tree.onDoubleClick(item);
    }
    onNodeMouseDown = e => {
        // console.log('TreeItem2.onNodeMouseDown', e.currentTarget);
        const item = this.props.item;
        const tree = this.props.tree;
        const opened = this.state.opened;
        e.stopPropagation();
        this.setState(prevState => {
            return {opened: !prevState.opened};
        });
        if (!opened) {
            tree.onOpen(item);
        }
    }
    isSelected() {
        return this.props.tree.state.selectedItem === this.props.item;
    }
    isOpened() {
        return this.state.opened;
    }
    render() {
        // console.log('TreeItem2.render', this.props.item.title);
        const tree = this.props.tree;
        const item = this.props.item;
        const items = item.items;
        const hasItems = !!(items && items.length);
        const isNode = item.node || hasItems;
        return <li key={item.title} className={this.isOpened() ? 'opened' : null}>
            <div className={this.isSelected() ? 'active' : null}
                 style={{paddingLeft: this.props.paddingLeft}}
                 onMouseDown={this.onDivMouseDown}
                 onDoubleClick={this.onDivDoubleClick}
            >
                <span className={isNode ? 'node' : 'leaf'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span>{item.title}</span>
            </div>
            {hasItems &&
            <ul>
                {items.map(item =>
                    <TreeItem2
                        key={item.title}
                        tree={tree}
                        item={item}
                        paddingLeft={this.props.paddingLeft+15}
                        // onCreate={c => { if (item.ctrl) item.ctrl.c = c}}
                    />
                )}
            </ul>
            }
        </li>;
    }
}
