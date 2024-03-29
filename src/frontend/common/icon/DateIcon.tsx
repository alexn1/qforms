import * as React from 'react';

export class DateIcon extends React.Component<any, any> {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
            </svg>
        );
    }
}

if (typeof window === 'object') {
    // @ts-ignore
    window.DateIcon = DateIcon;
}
