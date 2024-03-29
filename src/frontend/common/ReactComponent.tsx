import { Component, RefObject } from 'react';
import { Controller } from '../viewer/Controller/Controller';

export interface ReactComponentProps {
    ctrl?: Controller;
    name?: string;
    parent?: any;
    classList?: string[];
    enabled?: boolean;
    disabled?: boolean;
    onCreate?: any;
    onUnmount?: any;
}

export interface ReactComponentState {
    classList: string[];
    enabled: boolean;
    disabled: boolean;
}

export class ReactComponent<
    P extends ReactComponentProps = any,
    S extends ReactComponentState = any,
> extends Component<P, S> {
    allowRerender: boolean;
    el: RefObject<any>;

    constructor(props: P) {
        super(props);
        if (props.onCreate) {
            props.onCreate(this, this.props.name);
        }
        this.allowRerender = true;
    }

    getElement() {
        return this.el.current;
    }

    getParent() {
        return this.props.parent;
    }

    checkParent() {
        if (!this.props.parent) throw new Error(`${this.constructor.name}: no parent`);
    }

    getClassList(): string[] {
        return [
            this.getCssBlockName(),
            ...(this.props.classList || []),
            ...(this.state && this.state.classList ? this.state.classList : []),
        ];
    }

    addCssClass(className: string) {
        if (this.state.classList.indexOf(className) === -1) {
            this.state.classList.push(className);
        }
    }

    removeCssClass(className: string) {
        this.state.classList.splice(this.state.classList.indexOf(className), 1);
    }

    getCssBlockName(): string {
        return this.constructor.name;
    }

    getCssClassNames(): string {
        return this.getClassList().join(' ');
    }

    rerender(logTime = true) {
        // console.debug(`${this.constructor.name}.rerender`, this.state);
        if (!this.canRerender()) return Promise.resolve();
        return new Promise<void>((resolve) => {
            const start = Date.now();
            this.forceUpdate(() => {
                if (logTime) {
                    console.debug(`${this.constructor.name}.rerender time:`, Date.now() - start);
                }
                resolve();
            });
        });
    }

    canRerender() {
        if (!this.allowRerender) return false;
        if (this.props.parent) return this.props.parent.canRerender();
        return true;
    }

    disableRerender() {
        console.debug(`${this.constructor.name}.disableRerender`);
        this.allowRerender = false;
    }

    enableRerender() {
        console.debug(`${this.constructor.name}.enableRerender`);
        this.allowRerender = true;
    }

    componentWillUnmount() {
        // console.debug('ReactComponent.componentWillUnmount');
        if (this.props.onUnmount) this.props.onUnmount(this, this.props.name);
    }

    /* componentDidMount() {
        console.debug('ReactComponent.componentDidMount', this.constructor.name);
    } */

    isEnabled() {
        // console.debug('ReactComponent.isEnabled', this.state);
        return !this.isDisabled();
    }

    isDisabled() {
        if (this.state && this.state.disabled !== undefined) return this.state.disabled;
        if (this.props.disabled !== undefined) return this.props.disabled;
        if (this.props.enabled !== undefined) return !this.props.enabled;
        return false;
    }

    disable() {
        // console.debug('ReactComponent.disable');
        if (!this.state) throw new Error('no state');
        this.setState({ disabled: true });
    }

    enable() {
        if (!this.state) throw new Error('no state');
        this.setState({ disabled: undefined } as any);
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.ReactComponent = ReactComponent;
}
