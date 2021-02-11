class EditorView2 extends ReactComponent {
    onTabClose = i => {
        console.log('EditorView2.onTabClose', i);
    }
    render() {
        return <Tab
            classList={['full']}
            canClose={true}
            onTabClose={this.onTabClose}
            tabs={[
                {
                    name: 'tab1',
                    title: 'Tab1',
                    content: <div>tab1 content</div>
                },
                {
                    name: 'tab2',
                    title: 'Tab2',
                    content: <div>tab2 content</div>
                }
            ]}
        />;
    }
}
