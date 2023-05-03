import React from 'react';
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import SeoHead from '../../components/seo-head'
import PageLayout, {PageFrontmatter} from "../../components/page-layout";
import {gaEvent} from "../../hooks/analytics";
import GoogleAdsense from "../../components/google-adsense";

export const frontmatter: PageFrontmatter = {
    title: `블로그`,
    subtitle: `👩‍💻 🎮 🚴 ️🚀 `,
    excerpt: `이 블로그는 👩‍💻 프론트엔드 웹 개발자인 제가 꾹꾹 눌러 담아 정리한 글 모음집이에요. 개발 경험 일지보다는 시행착오를 바탕으로 만든 지름길 안내서를 지향해요.`,
    createdAt: `2017-07-07T00:00:00+09:00`,
    updatedAt: `2023-03-28T00:00:00+09:00`,
}

const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({data}) => {
    let {allSubjectJson: {nodes: blogSubjects}} = data

    return (
        <PageLayout frontmatter={frontmatter}>
            <p>
                이 블로그는 👩‍💻 프론트엔드 웹 개발자인 제가 꾹꾹 눌러 담아 정리한 글 모음집이에요.
                개발 경험 일지보다는 시행착오를 바탕으로 만든 지름길 안내서를 지향해요.
            </p>
            <p>
                빠르게 변하고 넘쳐나는 개발 지식을 배우고 다양한 기능을 구현하다 보면 전에 뚝딱 처리했던 내용을 까먹고 😅 또다시 실수하고 배우기를 반복하잖아요?
                그래서 며칠, 몇 개월, 길면 1년이 넘어서 내가 다시 봐도 가장 빠른 시간에 다시 목적지에 도착할 수 있게 개인 노트에 정리하곤 했는데요.
                그 내용에 조금 더 친절함을 더해서 초보 개발자가 봐도 찰떡같이 이해하도록 쓰고, 누구나 볼 수 있게 세상에 내놓으려고 해요.
            </p>
            <p>
                그럼, 시-작 🤓
            </p>

            {/*블로그 상단용(인피드)*/}
            <div className="blog-top-ad">
                <GoogleAdsense layoutKey="-gu-3+1f-3d+2z" slot="6555927968"/>
            </div>

            <div className="blog">
                {blogSubjects.map(subject => (
                    <div key={subject.id}>
                        <h2 id={subject.slug} className="post-subject-title">
                            {subject.title} ({subject.posts?.length || 0})
                        </h2>
                        <ul className={`post-list ${!subject.posts?.length ? 'empty' : ''}`}>
                            {subject.posts.length ?
                                subject.posts
                                    .filter(post => process.env.NODE_ENV != 'production' || !!post.frontmatter.createdAt)
                                    .map(post => (
                                        <li key={post.id}>
                                            <Link to={`/blog/${post.frontmatter.slug}`}
                                                  className="post-link"
                                                  onClick={() => gaEvent('navigation', 'click_post_in_blog', post.frontmatter.title)}
                                            >
                                                <span className={'link-title'}>{post.frontmatter.title}</span>
                                                {post.frontmatter.subtitle && (
                                                    <span className={'link-subtitle'}>
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

            <div className="blog-bottom-ad">
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
