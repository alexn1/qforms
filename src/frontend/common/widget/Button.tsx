import { createRef } from 'react';
import { ReactComponent } from '../ReactComponent';

export class Button extends ReactComponent {
    constructor(props) {
        // console.debug('Button.constructor', props);
        super(props);
        this.state = { disabled: undefined };
        this.el = createRef();
    }

    /*isDisabled() {
        if (this.props.disabled !== undefined) return this.props.disabled;
        if (this.props.enabled !== undefined) return !this.props.enabled;
        return this.state.disabled;
    }*/

    /*isEnabled() {
        return !this.isDisabled();
    }*/

    /*disable() {
        this.setState({disabled: true});
    }*/

    /*enable() {
        this.setState({disabled: false});
    }*/

    isVisible() {
        // return this.props.visible === undefined ? true : this.props.visible;
        if (this.props.visible !== undefined) return this.props.visible;
        return true;
    }

    getStyle() {
        return {
            display: !this.isVisible() ? 'none' : undefined,
            width: this.props.width,
        };
    }

    render() {
        // console.debug('Button.render', this.props.title, this.props);
        return (
            <button
                className={this.getCssClassNames()}
                ref={this.el}
                id={this.props.id}
                type={this.props.type}
                name={this.props.name}
                disabled={this.isDisabled()}
                onClick={this.props.onClick}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                onKeyDown={this.props.onKeyDown}
                style={this.getStyle()}>
                {this.props.title || this.props.children}
            </button>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.Button = Button;
}
