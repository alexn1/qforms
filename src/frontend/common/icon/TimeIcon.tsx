import * as React from 'react';

export class TimeIcon extends React.Component<any, any> {
    render() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#000000">
                <g>
                    <rect fill="none" height="24" width="24" x="0" />
                </g>
                <g>
                    <g>
                        <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" />
                    </g>
                </g>
            </svg>
        );
    }
}

// @ts-ignore
window.TimeIcon = TimeIcon;
