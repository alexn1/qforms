class ApplicationView extends ReactComponent {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
    }
    getTextarea() {
        return this.textarea.current;
    }
    componentDidMount() {
        console.log('ApplicationView.componentDidMount', this.getTextarea());
        const obj = CodeMirror.fromTextArea(this.getTextarea(), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        obj.setOption('theme', 'cobalt');
        obj.setValue('abc');
    }
    render() {
        return <div className={'ApplicationView full'}>
            <div className="full flex-rows">
                <div className="toolbar flex-min">
                    <Button>Create Custom Controller</Button>
                    <Button>Save</Button>
                </div>
                <div className="edit flex-max full">
                    <div className="cm-container full">
                        <textarea ref={this.textarea}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
