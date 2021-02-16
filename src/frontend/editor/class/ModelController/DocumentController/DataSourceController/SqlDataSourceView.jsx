class SqlDataSourceView extends ReactComponent {
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
                <div className="cm-container full wndSingleQuery">
                    <textarea className="cmSingleQuery"></textarea>
                </div>
            </div>
        </div>;
    }
}
