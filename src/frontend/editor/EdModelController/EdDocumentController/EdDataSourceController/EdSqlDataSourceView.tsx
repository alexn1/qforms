import * as React from 'react';
import { DocumentView } from '../EdDocumentView';
import { Button } from '../../../../common';
import './EdSqlDataSourceView.less';
import { Visibility } from '../../../../viewer';

export class SqlDataSourceView extends DocumentView {
    singleRef: React.RefObject<any>;
    multipleRef: React.RefObject<any>;
    countRef: React.RefObject<any>;
    singleQuery: any;
    multipleQuery: any;
    countQuery: any;

    constructor(props) {
        super(props);
        this.singleRef = React.createRef();
        this.multipleRef = React.createRef();
        this.countRef = React.createRef();
        this.state = {
            selected: 'singleQuery',
        };
        this.singleQuery = null;
        this.multipleQuery = null;
        this.countQuery = null;
    }

    componentDidMount() {
        const { ctrl } = this.props;
        this.singleQuery = DocumentView.createCM(
            this.singleRef.current,
            ctrl.model.getAttr('singleQuery'),
        );
        this.multipleQuery = DocumentView.createCM(
            this.multipleRef.current,
            ctrl.model.getAttr('multipleQuery'),
        );
        this.countQuery = DocumentView.createCM(
            this.countRef.current,
            ctrl.model.getAttr('countQuery'),
        );
        this.singleQuery.on('change', this.onChange);
        this.multipleQuery.on('change', this.onChange);
        this.countQuery.on('change', this.onChange);
    }

    componentWillUnmount() {
        this.singleQuery.off('change', this.onChange);
        this.multipleQuery.off('change', this.onChange);
        this.countQuery.off('change', this.onChange);
    }

    isChanged() {
        const { ctrl } = this.props;
        const cm = this[this.state.selected];
        if (!cm) return false;
        return cm.getValue() !== ctrl.model.getAttr(this.state.selected);
    }

    onChange = async (i, o) => {
        // console.log('SqlDataSourceView.onChange');
        await this.rerender();
    };

    getButtonClass(name: string): string {
        return this.state.selected === name ? 'btn-primary' : 'btn-default';
    }

    getVisibility(name: string): Visibility {
        return this.state.selected === name ? 'visible' : 'hidden';
    }

    onSaveClick = async (e) => {
        console.log('SqlDataSourceView.onSaveClick');
        const ctrl = this.props.ctrl;
        await ctrl.onSaveClick(this.state.selected, this[this.state.selected].getValue());
        await this.rerender();
    };

    isSelected(name: string): boolean {
        return this.state.selected === name;
    }

    render() {
        const { ctrl } = this.props;
        return (
            <div className={'SqlDataSourceView full flex-column'}>
                <div className="toolbar">
                    <Button onClick={this.onSaveClick} enabled={this.isChanged()}>
                        Save
                    </Button>
                    <Button onClick={ctrl.onCreateModelBack}>Model.back.js</Button>
                    &nbsp;
                    <div className="btn-group" role="group">
                        <button
                            className={`${this.getButtonClass('singleQuery')}`}
                            style={{ fontWeight: this.isSelected('singleQuery') ? 'bold' : null }}
                            onClick={(e) => this.setState({ selected: 'singleQuery' })}>
                            singleQuery
                        </button>
                        <button
                            className={`${this.getButtonClass('multipleQuery')}`}
                            style={{ fontWeight: this.isSelected('multipleQuery') ? 'bold' : null }}
                            onClick={(e) => this.setState({ selected: 'multipleQuery' })}>
                            multipleQuery
                        </button>
                        <button
                            className={`${this.getButtonClass('countQuery')}`}
                            style={{ fontWeight: this.isSelected('countQuery') ? 'bold' : null }}
                            onClick={(e) => this.setState({ selected: 'countQuery' })}>
                            countQuery
                        </button>
                    </div>
                </div>
                <div className="edit flex-max full">
                    <div
                        className="cm-container full"
                        style={{ visibility: this.getVisibility('singleQuery') }}>
                        <textarea ref={this.singleRef} />
                    </div>
                    <div
                        className="cm-container full"
                        style={{ visibility: this.getVisibility('multipleQuery') }}>
                        <textarea ref={this.multipleRef} />
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
