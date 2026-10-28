// Cross drawn to match OpenInNewThinIcon: 22x22 grid for 1:1 rendering at 22px, same line width.
export const CloseThinIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 22 22">
            <path
                d="M3.75 3.75L18.25 18.25M18.25 3.75L3.75 18.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
};

if (typeof window === 'object') {
    // @ts-ignore
    window.CloseThinIcon = CloseThinIcon;
}
