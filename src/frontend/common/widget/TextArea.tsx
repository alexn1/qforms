import { ReactComponent } from '../ReactComponent';

export class TextArea extends ReactComponent {
    constructor(props) {
        // console.debug('TextArea.constructor', props);
        super(props);
        this.state = {
            value: this.props.value || '',
        };
    }

    getValue() {
        return this.state.value;
    }

    onChange = (e) => {
        // console.debug('TextArea.onChange', e.target.value);
        this.setState({ value: e.target.value });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        // console.debug('TextArea.shouldComponentUpdate', 'nextProps:', nextProps, 'nextState:', nextState);
        // @ts-ignore
        this.state.value = nextProps.value;
        return true;
    }

    render() {
        // console.debug('TextArea.render');
        return (
            <textarea
                className={this.getCssClassNames()}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                cols={this.props.cols}
                value={this.state.value}
                onChange={this.onChange}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
            />
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.TextArea = TextArea;
}
