import { ReactComponent, Grid, Button } from '../../../../common';
import { TreeWidget } from '../../../TreeWidget/TreeWidget';
import './EdDatabaseView.less';

export class EdDatabaseView extends ReactComponent {
    renderGrid() {
        // console.debug('DatabaseView.renderGrid');
        const ctrl = this.props.ctrl;
        return (
            <Grid
                classList={['flex-max']}
                columns={[
                    { name: 'name', title: 'name', width: 100 },
                    { name: 'type', title: 'type', width: 60 },
                    { name: 'key', title: 'key', width: 60 },
                    { name: 'auto', title: 'auto', width: 60 },
                    { name: 'nullable', title: 'nullable', width: 60 },
                    { name: 'dbType', title: 'dbType', width: 200 },
                    { name: 'comment', title: 'comment', width: 100 },
                ]}
                rows={ctrl.tableInfo}
                getRowKey={(row) => row.name}
            />
        );
    }

    render() {
        // console.debug('DatabaseView.render');
        const ctrl = this.props.ctrl;
        const document = this.props.document;
        return (
            <div className={'EdDatabaseView frame'}>
                <div className={'client frame'}>
                    <div className={'frame__container'}>
                        <div className={'divTableInfo full flex-column'}>
                            {ctrl.tableInfo && this.renderGrid()}
                            {ctrl.tableInfo && (
                                <Button onClick={ctrl.onCreateTableClick}>Create Table</Button>
                            )}
                        </div>
                    </div>
                </div>
                <TreeWidget
                    classList={['sidebar']}
                    items={document.treeWidgetItems}
                    onItemSelect={ctrl.onTableSelect2}
                />
            </div>
        );
    }
}
