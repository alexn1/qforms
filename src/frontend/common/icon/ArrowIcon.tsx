export const ArrowIcon = (props) => {
    return (
        <svg width="10px" height="6px" viewBox="0 0 10 6">
            <path d="M1.429.253a.819.819 0 0 0-1.184 0 .883.883 0 0 0 0 1.22l4.142 4.274A.821.821 0 0 0 5 6a.821.821 0 0 0 .612-.253l4.143-4.273a.883.883 0 0 0 0-1.221.819.819 0 0 0-1.184 0L5 3.937 1.429.253z" />
        </svg>
    );
};

if (typeof window === 'object') {
    // @ts-ignore
    window.ArrowIcon = ArrowIcon;
}
