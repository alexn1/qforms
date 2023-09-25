import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent } from './ReactComponent';

export class ReactHelper {
    static createReactComponent(
        rootElement: Element,
        type: any,
        props = {},
        children?: ReactNode[],
    ): ReactComponent | undefined {
        // debug('ReactHelper.createReactComponent', rootElement, type);
        let component: ReactComponent | undefined = undefined;
        const reactRootElement = React.createElement(React.StrictMode, {}, [
            React.createElement(
                type,
                {
                    ...props,
                    onCreate: (c: ReactComponent, name: string) => {
                        component = c;
                    },
                } as any,
                children,
            ),
        ]);
        ReactDOM.render(reactRootElement, rootElement);
        return component;
    }

    static createReactComponent2(
        rootElement: Element,
        type: any,
        props = {},
        children?: ReactNode[],
    ): ReactComponent | undefined {
        // debug('ReactHelper.createReactComponent2', rootElement, type);
        let component: ReactComponent | undefined = undefined;
        const reactRootElement = React.createElement(React.StrictMode, {}, [
            React.createElement(
                type,
                {
                    ...props,
                    onCreate: (c: ReactComponent, name: string) => {
                        component = c;
                    },
                } as any,
                children,
            ),
        ]);
        // ReactDOM.render(reactRootElement, rootElement);
        ReactDOM.hydrate(reactRootElement, rootElement);
        return component;
    }

    /* static destroyReactComponent(root) {
        ReactDOM.unmountComponentAtNode(root);
    } */
}

// Helper.registerGlobalClass(ReactHelper);
