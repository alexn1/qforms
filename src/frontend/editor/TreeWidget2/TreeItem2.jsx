class TreeItem2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            opened: props.item.opened !== undefined ? props.item.opened : false
        };
        this.li = React.createRef();
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
        return this.props.tree.getSelectedItem() === this.props.item;
    }
    isOpened() {
        return this.state.opened;
    }
    getElement() {
        return this.li.current;
    }
    open() {
        console.log('TreeItem2.open', this.props.item.getTitle());
        this.state.opened = true;
        if (this.parent) {
            this.parent.open();
        } else {
            console.log('this.parent', this.parent);
        }
    }
    render() {
        // console.log('TreeItem2.render', this.props.item.getTitle());
        const tree = this.props.tree;
        const item = this.props.item;
        const items = item.items;
        const hasItems = !!(items && items.length);
        const isNode = item.node || hasItems;
        const style = item.getStyle ? item.getStyle() : null;
        const title = item.getTitle();
        return <li key={title} ref={this.li} className={this.isOpened() ? 'opened' : null}>
            <div className={this.isSelected() ? 'active' : null}
                 style={{paddingLeft: this.props.paddingLeft}}
                 onMouseDown={this.onDivMouseDown}
                 onDoubleClick={this.onDivDoubleClick}
            >
                <span className={isNode ? 'node' : 'leaf'} onMouseDown={this.onNodeMouseDown}/>
                &nbsp;
                <span style={style}>{title}</span>
            </div>
            {hasItems &&
            <ul>
                {items.map(item =>
                    <TreeItem2
                        key={item.getTitle()}
                        tree={tree}
                        item={item}
                        paddingLeft={this.props.paddingLeft+15}
                        onCreate={c => {
                            // console.log('onCreate', this.props.item.getTitle(), item.getTitle());
                            c.parent = this;
                            item.view = c;
                        }}
                    />
                )}
            </ul>
            }
        </li>;
    }
}
