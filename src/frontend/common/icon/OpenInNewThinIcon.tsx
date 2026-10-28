// Open-in-new icon drawn on a 22x22 grid to be rendered 1:1 at 22px: the line width is 2 and all
// line centers sit on integer coordinates, so edges fall on whole pixels (crisp at 1x and retina).
// The 24px Material glyph scaled down gets blurry edges.
export const OpenInNewThinIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 22 22">
            <path
                d="M10 4H4V18H18V12M13 4H18V9M18 4L9 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
};

if (typeof window === 'object') {
    // @ts-ignore
    window.OpenInNewThinIcon = OpenInNewThinIcon;
}
