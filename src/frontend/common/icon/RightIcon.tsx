export const RightIcon = (props: { size?: number }) => {
    const size = props.size || 24;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={size}
            width={size}
            viewBox="0 0 24 24"
            fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
    );
};

if (typeof window === 'object') {
    // @ts-ignore
    window.RightIcon = RightIcon;
}
