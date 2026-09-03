import type { MDXComponents } from "mdx/types.js"
import MdxLink from "./mdx-link"
import MdxImg from "./mdx-img"
import MdxFixSpan from "./mdx-fix-span"
import {Link} from "gatsby";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GoogleAdPostMiddle from "./google-ad-post-middle";
import React, {type ComponentPropsWithoutRef} from "react";


// rehype-pretty-code - tailwind typography 스타일 충돌 방지
const MdxCode = ({className, ...props}: ComponentPropsWithoutRef<'figure'>) => {
    if (props.hasOwnProperty('data-rehype-pretty-code-figure')) {
        return <figure {...props} className={['not-prose', className].filter(Boolean).join(' ')} />
    }
    return <figure {...props}/>
}

export const mdxComponents: MDXComponents = {
    Link,
    FontAwesomeIcon,
    GoogleAdPostMiddle,
    a: MdxLink,
    span: MdxFixSpan,
    img: MdxImg,
    figure: MdxCode,
}
