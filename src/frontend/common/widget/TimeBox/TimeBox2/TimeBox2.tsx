import React from 'react';
import {TimeBox} from '../TimeBox';

export class TimeBox2 extends TimeBox {
    inputEl: React.RefObject<any>;

    constructor(props) {
        super(props);
        this.inputEl = React.createRef();
    }
    isCloseVisible() {
        return !!this.state.value;
    }
    onClear = e => {
        // console.log('TimeBox2.onClear');
        this.setState({value: ''}, () => {
            if (this.props.onClear) {
                this.props.onClear();
            }
        });
    }
    getInputElement() {
        return this.inputEl.current;
    }
    render() {
        return <div ref={this.el} className={this.getCssClassNames()}>
            <input ref={this.inputEl}
                className={`${this.getCssBlockName()}__input`}
                type={'text'}
                // id={this.props.id}
                readOnly={this.props.readOnly}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                // onKeyUp={this.onKeyUp}
                onKeyPress={this.onKeyPress}
                onBlur={this.onBlur}
            />
            <div className={`${this.getCssBlockName()}__close-icon ${this.isCloseVisible() ? 'visible' : ''}`} onMouseDown={this.onClear}>
                <CloseIcon/>
            </div>
            <div className={`${this.getCssBlockName()}__time-icon`}>
                <TimeIcon/>
            </div>
        </div>;
    }
}
