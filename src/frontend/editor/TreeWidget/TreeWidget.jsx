class TreeWidget extends ReactComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        };
    }
    async select(item) {
        console.log('TreeWidget.select', item ? item.getTitle() : null);
        if (this.isSelected(item)) return;
        return new Promise(resolve => {
            this.setState({selectedItem: item}, () => {
                if (this.props.onItemSelect) this.props.onItemSelect(item);
                resolve();
            });
        });
    }
    onDoubleClick(item) {
        // console.log('TreeWidget.onDoubleClick', item);
        if (this.props.onItemDoubleClick) this.props.onItemDoubleClick(item);
    }
    onOpen(item) {
        if (this.props.onItemOpen) this.props.onItemOpen(item);
    }
    isSelected(item) {
        return this.state.selectedItem === item;
    }
    getSelectedItem() {
        return this.state.selectedItem;
    }
    scrollToSelected() {
        console.log('TreeWidget.scrollToSelected', this.getSelectedItem().getTitle());
        this.getSelectedItem().view.getElement().scrollIntoView();
    }
    render() {
        console.log('TreeWidget.render'/*, this.props.items*/);
        const items = this.props.items;
        return <div className={this.getClassName()}>
            <ul>
                {items.map(item =>
                    <TreeItem
                        key={item.getTitle()}
                        tree={this}
                        item={item}
                        paddingLeft={5}
                        onCreate={c => item.view = c}
                    />
                )}
            </ul>
        </div>;
    }
}
