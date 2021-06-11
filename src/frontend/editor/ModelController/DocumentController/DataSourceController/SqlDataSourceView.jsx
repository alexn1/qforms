class SqlDataSourceView extends DocumentView {
    constructor(props) {
        super(props);
        this.singleRef   = React.createRef();
        this.multipleRef = React.createRef();
        this.countRef    = React.createRef();
        this.state = {
            selected: 'singleQuery'
        };
        this.singleQuery   = null;
        this.multipleQuery = null;
        this.countQuery    = null;
    }
    componentDidMount() {
        const ctrl = this.props.ctrl;
        this.singleQuery   = DocumentView.createCM(this.singleRef.current  , ctrl.model.getAttr('singleQuery'));
        this.multipleQuery = DocumentView.createCM(this.multipleRef.current, ctrl.model.getAttr('multipleQuery'));
        this.countQuery    = DocumentView.createCM(this.countRef.current   , ctrl.model.getAttr('countQuery'));
    }
    getButtonClass(name) {
        return this.state.selected === name ? 'btn-primary' : 'btn-default';
    }
    getVisibility(name) {
        return this.state.selected === name ? 'visible' : 'hidden';
    }
    onSaveClick = async e => {
        console.log('SqlDataSourceView.onSaveClick');
        const ctrl = this.props.ctrl;
        await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
    }
    render() {
        const ctrl = this.props.ctrl;
        return <div className={'SqlDataSourceView full flex-rows'}>
            <div className="toolbar flex-min">
                <button onClick={this.onSaveClick}>Save</button>
                <button onClick={ctrl.onCreateModelBack}>Model.back.js</button>
                &nbsp;
                <div className="btn-group" role="group">
                    <button className={`${this.getButtonClass('singleQuery')}`}   onClick={e => this.setState({selected: 'singleQuery'})}>singleQuery</button>
                    <button className={`${this.getButtonClass('multipleQuery')}`} onClick={e => this.setState({selected: 'multipleQuery'})}>multipleQuery</button>
                    <button className={`${this.getButtonClass('countQuery')}`}    onClick={e => this.setState({selected: 'countQuery'})}>countQuery</button>
                </div>
            </div>
            <div className="edit flex-max full">
                <div className="cm-container full" style={{visibility: this.getVisibility('singleQuery')}}>
                    <textarea ref={this.singleRef}/>
                </div>
                <div className="cm-container full" style={{visibility: this.getVisibility('multipleQuery')}}>
                    <textarea ref={this.multipleRef}/>
                </div>
                <div className="cm-container full" style={{visibility: this.getVisibility('countQuery')}}>
                    <textarea ref={this.countRef}/>
                </div>
            </div>
        </div>;
    }
}
