class VisualView extends DocumentView {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.cm = null;
    }
    getTextarea() {
        if (this.textarea) return this.textarea.current;
        return null;
    }
    componentDidMount() {
        // console.log('VisualView.componentDidMount', this.getTextarea());
        const ctrl = this.props.ctrl;
        if (ctrl.data.js) {
            this.cm = DocumentView.createCM(this.getTextarea(), ctrl.data.js);
        }
    }
    componentDidUpdate() {
        // console.log('componentDidUpdate', this.getTextarea());
        const ctrl = this.props.ctrl;
        const textarea = this.getTextarea();
        if (textarea && ctrl.data.js && !this.cm) {
            this.cm = DocumentView.createCM(this.getTextarea(), ctrl.data.js);
        }
    }
    onControllerSave = async e => {
        const ctrl = this.props.ctrl;
        await ctrl.onControllerSave(this.cm.getValue());
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'VisualView full'}>
            <div className="full flex-rows">
                <div className="toolbar flex-min">
                    <Button onClick={ctrl.onCreateModelBack}>Model.back.js</Button>
                    {!ctrl.data.js && <Button onClick={ctrl.onCreateCustomController}>Controller.front.js</Button>}
                    {ctrl.data.js && <Button onClick={this.onControllerSave}>Save</Button>}
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
