import { Link } from '../types';

export interface LinksProps {
    links: any[];
}

export const Links = ({ links }: LinksProps) => {
    return (
        <>
            {links.map((link: string | Link, i) => {
                if (typeof link === 'string') {
                    return <link key={i} rel={'stylesheet'} href={link} />;
                } else if (typeof link === 'object') {
                    return (
                        <link
                            key={i}
                            rel={link.rel}
                            type={link.type}
                            href={link.href}
                            crossOrigin={link.crossorigin}
                        />
                    );
                }
            })}
        </>
    );
};
