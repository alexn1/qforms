class EditorView2 extends ReactComponent {
    render() {
        return <Tab
            classList={['full']}
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