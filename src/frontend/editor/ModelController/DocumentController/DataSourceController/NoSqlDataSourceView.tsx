import { DocumentView } from '../DocumentView';

export class NoSqlDataSourceView extends DocumentView {
    render() {
        const { ctrl } = this.props;
        return <div className={'NoSqlDataSourceView full flex-column'}>NoSqlDataSourceView</div>;
    }
}
