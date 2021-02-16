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
        const ctrl = this.props.ctrl;
        if (ctrl.data.js) {
            const cm = CodeMirror.fromTextArea(this.getTextarea(), {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
            cm.setOption('theme', 'cobalt');
            cm.setValue(ctrl.data.js);
            ctrl.onCMCreate(cm);
        }
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'ApplicationView full'}>
            <div className="full flex-rows">
                <div className="toolbar flex-min">
                    <Button>Create Custom Controller</Button>
                    <Button onClick={ctrl.onControllerSave}>Save</Button>
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
