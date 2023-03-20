import React from 'react';
import {graphql, Link, useStaticQuery} from "gatsby";
import {gaEvent} from "../hooks/analytics";

type Props = {
    slug: string
}

const BlogSubjectNav: React.FC<Props> = ({slug}) => {
    console.log('slug', slug)
    return <></>
};

export default BlogSubjectNav;
