export interface ScriptsProps {
    scripts: any[];
}

export const Scripts = ({ scripts }: ScriptsProps) => {
    return (
        <>
            {scripts.map((src, i) => {
                return <script key={i} type={'text/javascript'} src={src}></script>;
            })}
        </>
    );
};
