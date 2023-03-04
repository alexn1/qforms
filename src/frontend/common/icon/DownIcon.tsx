import * as React from 'react';

export class DownIcon extends React.Component<any, any> {
    render() {
        const size = this.props.size || 24;
        return (
            <svg xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 0 24 24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.DoneIcon = DoneIcon;
}
