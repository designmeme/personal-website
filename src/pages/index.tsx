import React from 'react';
import {HeadFC} from "gatsby";
import SeoHead from "../components/seo-head";

// 실제로 사용하지 않는 페이지 컴포넌트이지만 index 컴포넌트가 없으면 실서버에서 page-data.json 404 오류가 발생하기 때문에 이를 방지하기 위해 추가함.
const IndexPage = () => {
    return (
        <div></div>
    );
};

// gatsby-node.ts createRedirect 함수를 사용하여 / -> /blog 페이지로 리다이렉트 됨
// 위 기능은 gatsby hosting 사용시에만 작동하고 로컬 개발 서버에서는 작동하지 않음.
// 로컬 개발 서버에서 리다이렉트 하기 위해 meta 태그를 추가함.
export const Head: HeadFC = () =>
    <SeoHead>
        <meta httpEquiv="refresh" content="0; url=/blog/"></meta>
    </SeoHead>

export default IndexPage
