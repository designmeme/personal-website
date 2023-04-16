import React from 'react';
import {Link} from "gatsby";

interface Item {
    url?: string
    title?: string
    items?: Item[]
}

type TocListProps = {
    toc: Item
    depth?: number
}

type Props = {
    toc: Item
    title: string
}

const TocList: React.FC<TocListProps> = ({toc, depth = 0}) => {
    depth++

    return (
        <>
            {toc.items?.length && toc.items[0].url ? (
                <ol>
                    {toc.items?.map((item, index) => (
                        <li key={index}>
                            {item.url && <Link to={item.url}>{item.title}</Link>}
                            {item.items && <TocList toc={item} depth={depth}/>}
                        </li>
                    ))}
                </ol>
            ) :  toc.items?.map((item, index) => (
                <TocList toc={item} depth={depth} key={`toc-child-${depth}-${index}`}/>
            ))}
        </>
    );
};

const Toc: React.FC<Props> = ({toc, title}) => {
    return (
        <>
            {toc.items && (
                <div className={`markdown-toc`}>
                    <div className="toc-title">목차: {title}</div>
                    <TocList toc={toc}/>
                </div>
            )}
        </>
    );
};

export default Toc;
