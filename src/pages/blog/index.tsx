import React from 'react';
import {graphql, HeadFC, Link, PageProps} from "gatsby";
import Seo from '../../components/seo'
import PageLayout from "../../components/page-layout";
import {gaEvent} from "../../hooks/analytics";
import GoogleAdsense from "../../components/google-adsense";

const meta = {
    title: `블로그`,
    subtitle: `공부노트이자 성장노트`,
    description: `말그대로 기술이 범람하고 있는 것 같습니다. 요즘엔 Angular를 시작으로 자바스크립트 프레임워크에 관심이 있어 공부 중입니다.`
}

const BlogPage: React.FC<PageProps<Queries.BlogPageQuery>> = ({data}) => {
    let {allSubjectJson: {nodes: blogSubjects}} = data

    return (
        <PageLayout title={meta.title} subtitle={meta.subtitle}>
            <p>
                말그대로 기술이 범람하고 있는 것 같습니다. 요즘엔 Angular를 시작으로 자바스크립트 프레임워크에 관심이 있어 공부 중입니다.
                세상엔 고수가 많고 내 능력은 저만치 떨어져 있어 보입니다. 하지만 계속 그래왔듯이 차근차근 앞으로 나아가야겠죠.
                더불어 관련 내용을 글로 남기면서 깊이 있게 살펴보려합니다.
            </p>

            <p className="p-small">글은 주제에 따라 묶여 있으며, 의도한 순서로 표시됩니다. 작성 시간 순이 아님을 유념해주세요. 글 내용은 시간이 지남에 따라 추가·삭제·수정될 수 있습니다.</p>

            <GoogleAdsense layoutKey="-gu-3+1f-3d+2z" slot="6555927968" />

            <div className="blog">
                {blogSubjects.map(subject => (
                    <div key={subject.id}>
                        <h2 className="post-subject-title">{subject.title} ({subject.posts?.length || 0})</h2>
                        {subject.posts?.length && <ul className="post-list">
                            {
                                subject.posts.map(post => (
                                    <li key={post.id}>
                                        <Link to={`/blog/${post.frontmatter.slug}`}
                                              className="post-link"
                                              onClick={() => gaEvent('post-link-in-blog', 'click', post.frontmatter.title)}
                                        >
                                            {post.frontmatter.order}. {post.frontmatter.title}
                                        </Link>
                                        {/*todo move in Link*/}
                                        {post.frontmatter.subtitle && (
                                            <>
                                                {' '}&mdash;{' '}
                                                {post.frontmatter.subtitle}
                                            </>
                                        )}
                                    </li>
                                ))
                            }
                        </ul>}
                    </div>
                ))}
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
                        order
                    }
                }
            }
        }
    }
`

// todo blog scheme.org
export const Head: HeadFC = ({location}) =>
    <Seo title={meta.title + ' — ' + meta.subtitle}
         description={meta.description}
         pathname={location.pathname}></Seo>

export default BlogPage;
