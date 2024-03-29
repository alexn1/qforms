import * as React from 'react';
import { ReactComponent, Tab } from '../../common';
import { ActionList } from '../ActionList/ActionList';
import { TreeWidget } from '../TreeWidget/TreeWidget';
import { PropertyGrid } from '../PropertyGrid/PropertyGrid';
import { EdModalView } from '../EdModalController/EdModalView';
import './EditorFrontHostAppView.less';

export class EditorFrontHostAppView extends ReactComponent {
    renderDocumentView(document) {
        if (!document.controller.getDocumentViewClass()) {
            return <div>no document view for {document.controller.constructor.name}</div>;
        }

        return React.createElement(document.controller.getDocumentViewClass(), {
            // @ts-ignore
            onCreate: (c) => (document.view = c),
            document: document,
            ctrl: document.controller,
        });
    }

    getTabs() {
        console.debug('EditorFrontHostAppView.getTabs', this.props.ctrl.documents);
        return this.props.ctrl.documents.map((document) => ({
            name: document.controller.model.getFullName(),
            title: document.controller.model.getFullName(),
            content: this.renderDocumentView(document),
        }));
    }

    render() {
        const { ctrl } = this.props;
        return (
            <div className="EditorFrontHostAppView">
                <div className={'EditorFrontHostAppView__sidebar'}>
                    <div className={'tree-bar'}>
                        {/*<div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" >
                            <span>Actions</span> <span className="caret"/>
                        </button>
                    </div>*/}
                        <a href={ctrl.runAppLink} target="_blank">
                            Run Application
                        </a>
                        <div>
                            <ActionList
                                onCreate={(c) => (ctrl.actionList = c)}
                                onClick={ctrl.onActionClick}
                            />
                        </div>
                    </div>
                    <div className={'frame full'}>
                        <div className={'frame__container'}>
                            <TreeWidget
                                classList={['full']}
                                onCreate={(c) => (ctrl.treeWidget2 = c)}
                                items={ctrl.items}
                                onItemSelect={ctrl.onItemSelect2}
                                onItemDoubleClick={ctrl.onItemDoubleClick2}
                                onItemOpen={ctrl.onItemOpen2}
                            />
                        </div>
                    </div>
                    <Tab
                        classList={['Tab-blue', 'full']}
                        tabs={[
                            {
                                name: 'properties',
                                title: 'Properties',
                                content: (
                                    <PropertyGrid
                                        onCreate={(c) => (ctrl.pg = c)}
                                        onChange={ctrl.onPropertyGrid2Change}
                                    />
                                ),
                            },
                        ]}
                    />
                </div>
                <div className={'EditorFrontHostAppView__client'}>
                    <Tab
                        classList={['full']}
                        canClose={true}
                        onTabClose={ctrl.onDocumentClose}
                        onCreate={(c) => (ctrl.tabWidget = c)}
                        tabs={this.getTabs()}
                    />
                </div>
                {ctrl.modal && React.createElement(EdModalView, { ctrl: ctrl.modal })}
            </div>
        );
    }
}
