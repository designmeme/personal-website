import React from 'react';
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import SeoHead from '../../components/seo-head'
import PageLayout, {PageFrontmatter} from "../../components/page-layout";
import GoogleAdsense from "../../components/google-adsense";

export const frontmatter: PageFrontmatter = {
    title: `블로그`,
    subtitle: `👩‍💻 🎮 🚴 ️🚀 🏊🏼‍♀️`,
    excerpt: `웹 개발, 사이드 프로젝트, 프리랜서 구인구직, 취미 등 글 모음집입니다.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2026-09-04T00:00:00+09:00`,
}

const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({data}) => {
    let {allSubjectJson: {nodes: blogSubjects}} = data

    return (
        <PageLayout frontmatter={frontmatter}>
            <p>
               웹 개발, 사이드 프로젝트, 프리랜서 구인구직, 취미 등 글 모음집입니다.
            </p>

            {/*블로그 상단용(인피드)*/}
            <div className="my-10 print:hidden">
                <GoogleAdsense layoutKey="-gu-3+1f-3d+2z" slot="6555927968"/>
            </div>

            <div className="mt-20">
                {blogSubjects.map(subject => (
                    <div key={subject.id}>
                        <h2 id={subject.slug} className="mb-4 text-lg font-medium">
                            {subject.title} ({subject.posts?.length || 0})
                        </h2>
                        <ul className="mb-10 text-sm">
                            {subject.posts.length ?
                                subject.posts
                                    .filter(post => process.env.NODE_ENV != 'production' || !!post.frontmatter.createdAt)
                                    .map(post => (
                                        <li key={post.id} className="mb-4">
                                            <Link to={`/blog/${post.frontmatter.slug}`} className="no-underline">
                                                <span className="underline">{post.frontmatter.title}</span>
                                                {post.frontmatter.subtitle && (
                                                    <span className="text-secondary">
                                                        {' '}&mdash;{' '}
                                                        {post.frontmatter.subtitle}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    ))
                                : <li>아직 작성 중이에요. 조금만 기다려 주세요 ✍️</li>}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="my-10 print:hidden">
                {/*블로그 하단용(디스플레이)*/}
                <GoogleAdsense format="auto" slot="2345060685" responsive={true}/>
            </div>
        </PageLayout>
    )
}

export const query = graphql`
    query BlogPage {
        allSubjectJson {
            nodes {
                id
                slug
                title
                posts {
                    id
                    frontmatter {
                        slug
                        title
                        subtitle
                        createdAt
                        order
                    }
                }
            }
        }
    }
`

// todo blog scheme.org
export const Head: HeadFC = ({location}) =>
    <SeoHead title={frontmatter.title}
             description={frontmatter.excerpt}
             pathname={location.pathname}></SeoHead>

export default BlogPage;
