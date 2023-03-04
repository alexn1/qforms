import * as React from 'react';

export class DoneIcon extends React.Component<any, any> {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.DoneIcon = DoneIcon;
}
