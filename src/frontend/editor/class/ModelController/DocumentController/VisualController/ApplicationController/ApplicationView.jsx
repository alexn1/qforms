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


            <div className="full flex-rows" style={{backgroundColor: "#bbb"}}>
                <div className="flex-min" style={{backgroundColor: "white", padding: 5}}>
                    <button className="btn btn-default btn-xs btnCreateController">Create Custom Controller</button>
                    <button className="btn btn-default btn-xs btnSaveController">Save</button>
                </div>
                <div className="flex-max full" style={{overflow: 'auto'}}>
                    <div className="cm-container full">
                        <textarea ref={this.textarea}/>
                    </div>
                </div>
            </div>



        </div>;
    }
}
