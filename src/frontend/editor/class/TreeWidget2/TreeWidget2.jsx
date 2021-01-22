class TreeWidget2 extends ReactComponent {
    render() {
        // console.log('TreeWidget2.render', this.props.items);
        const items = this.props.items;
        return <div className={'TreeWidget2'}>
            <ul style={{paddingLeft: 5}}>
                {items.map(item => <TreeItem2 key={item.title} item={item}/>)}
            </ul>
        </div>;
    }
}
