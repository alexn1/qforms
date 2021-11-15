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
            this.cm.on('change', this.onChange);
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
    componentWillUnmount() {
        // console.log('VisualView.componentWillUnmount');
        if (this.cm) {
            this.cm.off('change', this.onChange);
        }
    }
    onControllerSave = async e => {
        const ctrl = this.props.ctrl;
        await ctrl.onControllerSave(this.cm.getValue());
    }
    onChange = async (instance, changeObj) => {
        // console.log('VisualView.onChange', this.isChanged());
        await this.rerender();
    }
    isChanged() {
        if (!this.cm) {
            return false;
        }
        return this.props.ctrl.data.js !== this.cm.getValue();
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'VisualView full'}>
            <div className="full flex-column">
                <div className="toolbar">
                    <Button onClick={ctrl.onCreateModelBack}>Model.back.js</Button>
                    {!ctrl.data.js && <Button onClick={ctrl.onCreateCustomController}>Controller.front.js</Button>}
                    {!ctrl.data.jsx && <Button onClick={ctrl.onCreateCustomView}>View.jsx</Button>}
                    {!ctrl.data.less && <Button onClick={ctrl.onCreateCustomStyle}>View.less</Button>}
                    {ctrl.data.js &&
                        <Button onClick={this.onControllerSave} enabled={this.isChanged()}>Save</Button>
                    }
                </div>
                <div className={'edit flex-max full'}>
                    <div className={'cm-container full'}>
                        {ctrl.data.js && <textarea ref={this.textarea}/>}
                    </div>
                </div>
            </div>
        </div>;
    }
}
