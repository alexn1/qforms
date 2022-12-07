interface LinksProps {
    links: any[];
}

export const Links = ({ links }: LinksProps) => {
    return (
        <>
            {links.map((link, i) => {
                if (typeof link === 'string') {
                    return <link key={i} rel={'stylesheet'} href={link} />;
                } else if (typeof link === 'object') {
                    return (
                        <link
                            key={i}
                            rel={link.rel}
                            href={link.href}
                            crossOrigin={link.crossorigin ? 'anonymous' : undefined}
                        />
                    );
                }
            })}
        </>
    );
};
