import React from 'react';
import {Link} from "gatsby";

interface Item {
    url?: string
    title?: string
    items?: Item[]
}

interface TocProps {
    toc?: Item
}

type Props = {
    toc: Item
    depth?: number
}

const TocList: React.FC<Props> = ({toc, depth = 0}) => {
    depth++

    return (
        <>
            {toc.items?.length && toc.items[0].url ? (
                <ul>
                    {toc.items?.map((item, index) => (
                        <li key={`toc-${depth}-${index}`}>
                            {/*toc-{depth}-{index}*/}
                            {item.url && <Link to={item.url}>{item.title}</Link>}
                            {item.items && <TocList toc={item} depth={depth}/>}
                        </li>
                    ))}
                </ul>
            ) :  toc.items?.map((item, index) => (
                <TocList toc={item} depth={depth} key={`toc-child-${depth}-${index}`}/>
            ))}
        </>
    );
};

const Toc: React.FC<Props> = ({toc}) => {
    return (
        <>
            {toc?.items && <div id={`markdown-toc`}>
                <TocList toc={toc}/>
            </div>}
        </>
    );
};

export default Toc;
