class SqlDataSourceView extends DocumentView {
    constructor(props) {
        super(props);
        this.cmSingleQuery   = React.createRef();
        this.cmMultipleQuery = React.createRef();
        this.cmCountQuery    = React.createRef();
        this.state = {
            selected: 'single'
        };
    }
    getCmSingleQuery() {
        return this.cmSingleQuery.current;
    }
    getCmMultipleQuery() {
        return this.cmMultipleQuery.current;
    }
    getCmCountQuery() {
        return this.cmCountQuery.current;
    }
    componentDidMount() {
        const ctrl = this.props.ctrl;
        const cmSingleQuery = DocumentView.createCM(this.getCmSingleQuery(), ctrl.model.getAttr('singleQuery'));
        const cmMultipleQuery = DocumentView.createCM(this.getCmMultipleQuery(), ctrl.model.getAttr('multipleQuery'));
        const cmCountQuery = DocumentView.createCM(this.getCmCountQuery(), ctrl.model.getAttr('countQuery'));
        ctrl.onCmCreate(cmSingleQuery, cmMultipleQuery, cmCountQuery);
    }
    getButtonClass(name) {
        return this.state.selected === name ? 'btn-primary' : 'btn-default';
    }
    getVisibility(name) {
        return this.state.selected === name ? 'visible' : 'hidden';
    }
    onSaveClick = e => {
        console.log('SqlDataSourceView.onSaveClick');
    }
    render() {
        return <div className={'SqlDataSourceView full flex-rows'}>
            <div className="toolbar flex-min">
                <button className="btn btn-default btn-xs" onClick={this.onSaveClick}>Save</button>
                &nbsp;
                <div className="btn-group" role="group">
                    <button className={`btn btn-xs ${this.getButtonClass('single')}`}   onClick={e => this.setState({selected: 'single'})}>singleQuery</button>
                    <button className={`btn btn-xs ${this.getButtonClass('multiple')}`} onClick={e => this.setState({selected: 'multiple'})}>multipleQuery</button>
                    <button className={`btn btn-xs ${this.getButtonClass('count')}`}    onClick={e => this.setState({selected: 'count'})}>countQuery</button>
                </div>
            </div>
            <div className="edit flex-max full">
                <div className="cm-container full" style={{visibility: this.getVisibility('single')}}>
                    <textarea ref={this.cmSingleQuery}></textarea>
                </div>
                <div className="cm-container full" style={{visibility: this.getVisibility('multiple')}}>
                    <textarea ref={this.cmMultipleQuery}></textarea>
                </div>
                <div className="cm-container full" style={{visibility: this.getVisibility('count')}}>
                    <textarea ref={this.cmCountQuery}></textarea>
                </div>
            </div>
        </div>;
    }
}
