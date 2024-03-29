import * as React from 'react';
import { EdDocumentView } from '../EdDocumentView';
import { Button } from '../../../../common';
import { Visibility } from '../../../../../types';

import './EdNoSqlDataSourceView.less';

export class EdNoSqlDataSourceView extends EdDocumentView {
    selectRef: React.RefObject<any>;
    countRef: React.RefObject<any>;
    selectQuery: any;
    countQuery: any;

    constructor(props) {
        super(props);
        this.selectRef = React.createRef();
        this.countRef = React.createRef();
        this.state = {
            selected: 'selectQuery',
        };
        this.selectQuery = null;
        this.countQuery = null;
    }

    componentDidMount() {
        const { ctrl } = this.props;
        this.selectQuery = EdDocumentView.createCM(
            this.selectRef.current,
            ctrl.model.getAttr('selectQuery'),
        );
        this.countQuery = EdDocumentView.createCM(
            this.countRef.current,
            ctrl.model.getAttr('countQuery'),
        );
        this.selectQuery.on('change', this.onChange);
        this.countQuery.on('change', this.onChange);
    }

    componentWillUnmount() {
        this.selectQuery.off('change', this.onChange);
        this.countQuery.off('change', this.onChange);
    }

    isChanged() {
        const { ctrl } = this.props;
        const cm = this[this.state.selected];
        if (!cm) return false;
        return cm.getValue() !== ctrl.model.getAttr(this.state.selected);
    }

    onChange = async (i, o) => {
        // console.debug('NoSqlDataSourceView.onChange');
        await this.rerender();
    };

    getButtonClass(name: string): string {
        return this.state.selected === name ? 'btn-primary' : 'btn-default';
    }

    getVisibility(name: string): Visibility {
        return this.state.selected === name ? 'visible' : 'hidden';
    }

    onSaveClick = async (e) => {
        console.debug('NoSqlDataSourceView.onSaveClick');
        const ctrl = this.props.ctrl;
        await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
        await this.rerender();
    };

    isSelected(name) {
        return this.state.selected === name;
    }

    render() {
        const { ctrl } = this.props;
        return (
            <div className={'EdNoSqlDataSourceView full flex-column'}>
                <div className="toolbar">
                    <Button onClick={this.onSaveClick} enabled={this.isChanged()}>
                        Save
                    </Button>
                    <Button onClick={ctrl.onCreateModelBack}>Model.back.ts</Button>
                    &nbsp;
                    <div className="btn-group" role="group">
                        <button
                            className={`${this.getButtonClass('selectQuery')}`}
                            style={{
                                fontWeight: this.isSelected('selectQuery') ? 'bold' : undefined,
                            }}
                            onClick={(e) => this.setState({ selected: 'selectQuery' })}>
                            selectQuery
                        </button>
                        <button
                            className={`${this.getButtonClass('countQuery')}`}
                            style={{
                                fontWeight: this.isSelected('countQuery') ? 'bold' : undefined,
                            }}
                            onClick={(e) => this.setState({ selected: 'countQuery' })}>
                            countQuery
                        </button>
                    </div>
                </div>
                <div className="edit flex-max full">
                    <div
                        className="cm-container full"
                        style={{ visibility: this.getVisibility('selectQuery') }}>
                        <textarea ref={this.selectRef} />
                    </div>
                    <div
                        className="cm-container full"
                        style={{ visibility: this.getVisibility('countQuery') }}>
                        <textarea ref={this.countRef} />
                    </div>
                </div>
            </div>
        );
    }
}
