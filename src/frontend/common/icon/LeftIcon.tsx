import React from 'react';

interface LeftIconProps {
    size?: number;
}

export const LeftIcon: React.FunctionComponent<LeftIconProps> = (props: LeftIconProps) => {
    const size = props.size || 24;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            viewBox="0 0 24 24"
            fill="#000000"
        >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.61 7.41L14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z" />
        </svg>
    );
};

// @ts-ignore
window.LeftIcon = LeftIcon;
