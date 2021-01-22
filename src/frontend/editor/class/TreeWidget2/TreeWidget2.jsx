class TreeWidget2 extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    }
    select(item) {
        // console.log('TreeWidget2.select', item);
        this.setState({selectedItem: item});
    }
    render() {
        // console.log('TreeWidget2.render', this.props.items);
        const items = this.props.items;
        return <div className={'TreeWidget2'}>
            <ul>
                {items.map(item => <TreeItem2 key={item.title} tree={this} item={item} paddingLeft={5}/>)}
            </ul>
        </div>;
    }
}
