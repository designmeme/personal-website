import * as React from 'react'
import {graphql, HeadFC, Link, PageProps} from 'gatsby'
import Layout from '../components/layout'
import SeoHead from '../components/seo-head'
import {GatsbyImage} from "gatsby-plugin-image";
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {MDXProvider} from "@mdx-js/react"
import {gaEvent} from "../hooks/analytics";
import {OutboundLink} from "gatsby-plugin-google-gtag";
import GoogleAdsense from "../components/google-adsense";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCreativeCommons,
    faCreativeCommonsBy,
    faCreativeCommonsNc,
    faCreativeCommonsNd,
    faFacebookF,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {faArrowLeftLong, faArrowRightLong, faCircle} from "@fortawesome/free-solid-svg-icons";
import {faFaceGrinWide} from "@fortawesome/free-regular-svg-icons";
import Toc from "../components/toc";
import SideBySide from '../components/side-by-side';
import MdxLink from '../components/mdx-link';
import MdxFixSpan from '../components/mdx-fix-span';
import {BlogPosting, BreadcrumbList, WithContext} from "schema-dts";
import BlogSideNav from "../components/blog-side-nav";
import {useMediaQuery} from 'react-responsive'
import PageMeta from "../components/page-meta";
import RssFeedInfo from "../components/rss-feed-info";
import GoogleAdPostMiddle from "../components/google-ad-post-middle";


const shortcodes = {
    Link,
    SideBySide,
    FontAwesomeIcon,
    GoogleAdPostMiddle,
    a: (props: any) => <MdxLink {...props} />,
    span: (props: any) => <MdxFixSpan {...props} />,
}

type PageContextType = {
    id: String
    previous: Queries.Mdx | null
    next: Queries.Mdx | null
}


const PostPage: React.FC<PageProps<Queries.PostPageQuery, PageContextType>>
    = ({data, children, path, pageContext}) => {
    const {previous, next} = pageContext
    const {siteUrl} = useSiteMetadata()
    const {frontmatter} = data.mdx!
    const {
        subject,
        title,
        subtitle,
        image,
        tags,
        createdAt,
        updatedAt,
    } = frontmatter!

    const readMinutes = Math.ceil(data.mdx?.fields?.timeToRead?.minutes!)
    const canonical = siteUrl + path

    // SSR 결과에 isDesktop이 아닌 경우 포함됨.
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    return (
        <Layout>

            <aside className="sidebar-left">
                <BlogSideNav subject={subject}></BlogSideNav>
            </aside>

            <article className="page">
                <header className="page-header">
                    <nav aria-label="breadcrumb" className="breadcrumb">
                        <ol>
                            <li><Link to={'/blog'}>블로그</Link></li>
                            <li><Link to={`/blog/#${subject.slug}`}>{subject.title}</Link></li>
                        </ol>
                    </nav>

                    <h1 className="page-title">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="page-subtitle"> {subtitle}</p>
                    )}

                    {!isDesktop && <PageMeta createdAt={createdAt}
                                             updatedAt={updatedAt}
                                             readMinutes={readMinutes}
                                             tags={tags}
                    />}

                </header>

                {image && (
                    <GatsbyImage
                        class={'page-image hero-image'}
                        image={image.childImageSharp?.gatsbyImageData!}
                        alt={`${title}${subtitle ? ` — ${subtitle}` : ''}`}/>
                )}

                {!isDesktop && <Toc toc={data.mdx?.tableOfContents!} title={title} useScrollActive={false}/>}

                <div className="post-top-ad">
                    {/*포스트 상단용(인피드)*/}
                    <GoogleAdsense layoutKey="-f9+5v+4m-d8+7b" slot="9726040265"/>
                </div>

                <div className="page-content heading-number">
                    <MDXProvider components={shortcodes}>{children}</MDXProvider>
                </div>

                <div className="post-bottom-ad">
                    {/*포스트 하단용(디스플레이)*/}
                    <GoogleAdsense format="auto" slot="6926754782" responsive={true}/>
                </div>

                <footer className="page-footer">
                    <div className="sns-links">
                        <OutboundLink href={`https://www.facebook.com/sharer/sharer.php?u=${canonical}`}
                                      className="sns-link facebook" target="_blank" aria-label="facebook"
                                      onClick={() => gaEvent('share', 'click_facebook', frontmatter.title)}
                        >
                            <FontAwesomeIcon icon={faFacebookF} transform={'shrink-8'} mask={faCircle}/>
                            <span className="sr-only">facebook</span>
                        </OutboundLink>
                        <OutboundLink href={`https://twitter.com/home?status=${canonical}`}
                                      className="sns-link twitter"
                                      target="_blank" aria-label="twitter"
                                      onClick={() => gaEvent('share', 'click_twitter', frontmatter.title)}
                        >
                            <FontAwesomeIcon icon={faTwitter} transform={'shrink-8'} mask={faCircle}/>
                            <span className="sr-only">twitter</span>
                        </OutboundLink>
                    </div>

                    <div className="cc-info">
                        <div className="cc-icons">
                            <FontAwesomeIcon className="cc-icon" icon={faCreativeCommons}/>
                            <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsBy}/>
                            <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsNc}/>
                            <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsNd}/>
                        </div>
                        블로그 글의 내용은 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ko" target="_blank">크리에이티브
                        커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스</a>에 따라 이용하실 수 있습니다.
                    </div>

                    <div className="post-nav">
                        {next && <Link to={`/blog/${next.frontmatter.slug}`}
                                       className="post-next-link"
                                       onClick={() => gaEvent('navigation', 'click_next_post', next.frontmatter.title)}>
                            {next.frontmatter.title}
                            <span className="icon">
                                <FontAwesomeIcon icon={faFaceGrinWide}/>
                                <FontAwesomeIcon icon={faArrowRightLong}/>
                            </span>
                        </Link>}
                        {previous && <Link to={`/blog/${previous.frontmatter.slug}`}
                                           className="post-prev-link"
                                           onClick={() => gaEvent('navigation', 'click_prev_post', previous.frontmatter.title!)}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faArrowLeftLong}/>
                                <FontAwesomeIcon icon={faFaceGrinWide}/>
                            </span>
                            {previous.frontmatter.title}
                        </Link>}
                    </div>

                    {!isDesktop && <RssFeedInfo/>}
                </footer>

            </article>

            <aside className="sidebar-right">
                {isDesktop && (
                    <>
                        <PageMeta createdAt={createdAt}
                                  updatedAt={updatedAt}
                                  readMinutes={readMinutes}
                                  tags={tags}
                        />
                        <RssFeedInfo/>
                        <Toc toc={data.mdx?.tableOfContents!} title={title}/>
                    </>
                )}
            </aside>
        </Layout>
    )
}

export const query = graphql`
    query PostPage ($id: String!) {
        mdx(id: {eq: $id}) {
            tableOfContents
            frontmatter {
                ...BlogSideNavSubject
                title
                subtitle
                excerpt
                image {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                tags
                slug
                createdAt
                updatedAt
                order
            }
            fields {
                timeToRead {
                    minutes
                    words
                }
            }
        }
    }
`

export const Head: HeadFC<Queries.PostPageQuery> = ({data, location}) => {
    const meta = useSiteMetadata()
    const {
        title,
        subtitle,
        subject,
        excerpt,
        image,
        tags,
        createdAt,
        updatedAt,
    } = data.mdx!.frontmatter!

    const fullTitle = `${title}${(subtitle ? ` — ${subtitle}` : '')} | ${subject.title}`

    const schema: Array<WithContext<BlogPosting | BreadcrumbList>> = [
        // 구조화된 기사(Article, NewsArticle, BlogPosting) 데이터
        // https://developers.google.com/search/docs/appearance/structured-data/article?hl=ko
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: fullTitle!,
            image: image ? [image.publicURL!] : undefined,
            datePublished: createdAt!,
            dateModified: updatedAt!,
            author: [
                {
                    "@type": "Person",
                    name: meta.author!,
                    url: meta.siteUrl + '/about/'
                },
            ],
            wordCount: data.mdx?.fields?.timeToRead?.words!,
            keywords: tags || undefined,
            isPartOf: {
                "@type": "Blog",
                name: meta.title + ' 블로그',
                url: meta.siteUrl + '/blog/'
            },
        },
        // 구조화된 탐색경로(BreadcrumbList) 데이터
        // https://developers.google.com/search/docs/appearance/structured-data/breadcrumb?hl=ko
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{
                "@type": "ListItem",
                position: 1,
                name: "블로그",
                item: `${meta.siteUrl}/blog/`,
            }, {
                "@type": "ListItem",
                position: 2,
                name: subject.title,
                item: `${meta.siteUrl}/blog/#${subject.slug}`,
            }, {
                "@type": "ListItem",
                position: 3,
                name: title
            }]
        },
    ];

    return <SeoHead title={fullTitle}
                    useSiteTitle={false}
                    description={excerpt}
                    image={image?.publicURL}
                    pathname={location.pathname}
                    schema={schema}
    >
    </SeoHead>
}

export default PostPage
