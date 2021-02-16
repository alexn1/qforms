class VisualView extends ReactComponent {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
    }
    getTextarea() {
        if (this.textarea) return this.textarea.current;
        return null;
    }
    componentDidMount() {
        // console.log('VisualView.componentDidMount', this.getTextarea());
        const ctrl = this.props.ctrl;
        if (ctrl.data.js) {
            const cm = VisualView.createCM(this.getTextarea(), ctrl.data.js);
            ctrl.onCMCreate(cm);
        }
    }
    static createCM(textarea, value) {
        const cm = CodeMirror.fromTextArea(textarea, {lineNumbers: true, styleActiveLine: true, matchBrackets: true});
        cm.setOption('theme', 'cobalt');
        cm.setValue(value);
        return cm;
    }
    componentDidUpdate() {
        // console.log('componentDidUpdate', this.getTextarea());
        const ctrl = this.props.ctrl;
        const textarea = this.getTextarea();
        if (textarea && ctrl.data.js && !ctrl.cm) {
            const cm = VisualView.createCM(this.getTextarea(), ctrl.data.js);
            ctrl.onCMCreate(cm);
        }
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'VisualView full'}>
            <div className="full flex-rows">
                <div className="toolbar flex-min">
                    {!ctrl.data.js && <Button onClick={ctrl.onCreateCustomController}>Create Custom Controller</Button>}
                    {ctrl.data.js && <Button onClick={ctrl.onControllerSave}>Save</Button>}
                </div>
                <div className="edit flex-max full">
                    <div className="cm-container full">
                        {ctrl.data.js && <textarea ref={this.textarea}/>}
                    </div>
                </div>
            </div>
        </div>;
    }
}
