interface ScriptsProps {
    scripts: any[];
}

export const Scripts = ({ scripts }: ScriptsProps) => {
    return (
        <>
            {scripts.map((scr, i) => {
                return <script key={i} type={'text/javascript'} src={scr}></script>;
            })}
        </>
    );
};
