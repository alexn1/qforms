class SqlDataSourceView extends ReactComponent {
    constructor(props) {
        super(props);
        this.cmSingleQuery = React.createRef();
        this.cmMultipleQuery = React.createRef();
        this.cmCountQuery = React.createRef();
    }
    render() {
        return <div className={'SqlDataSourceView full flex-rows'}>
            <div className="toolbar flex-min">
                <button className="btn btn-default btn-xs btnSave">Save</button>
                &nbsp;
                <div className="btn-group" role="group">
                    <button className="btn btn-xs btn-primary btnSingleQuery">singleQuery</button>
                    <button className="btn btn-xs btn-default btnMultipleQuery">multipleQuery</button>
                    <button className="btn btn-xs btn-default btnCountQuery">countQuery</button>
                </div>
            </div>
            <div className="edit flex-max full">
                <div className="cm-container full" style={{display: 'none'}}>
                    <textarea ref={this.cmSingleQuery}></textarea>
                </div>
                <div className="cm-container full" style={{display: 'none'}}>
                    <textarea ref={this.cmMultipleQuery}></textarea>
                </div>
                <div className="cm-container full" style={{display: 'none'}}>
                    <textarea ref={this.cmCountQuery}></textarea>
                </div>
            </div>
        </div>;
    }
}
