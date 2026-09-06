import * as React from "react"
import {HeadFC, Link, PageProps} from "gatsby"
import SeoHead from "../components/seo-head"
import PageLayout, {PageFrontmatter} from "../components/page-layout"

export const frontmatter: PageFrontmatter = {
    title: "페이지를 찾을 수 없어요",
    subtitle: "404 · Not found",
    excerpt: "주소가 변경되었거나 더 이상 존재하지 않는 페이지입니다.",
}

const NotFoundPage: React.FC<PageProps> = () => (
    <PageLayout frontmatter={frontmatter}>
        <p>{frontmatter.excerpt}</p>
    </PageLayout>
)

export const Head: HeadFC = ({location}) => (
    <SeoHead title={frontmatter.title}
             description={frontmatter.excerpt}
             noindex={true}
             pathname={location.pathname}/>
)

export default NotFoundPage
