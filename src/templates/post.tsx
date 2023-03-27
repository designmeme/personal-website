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
import {faFacebookF, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faArrowLeftLong, faArrowRightLong, faBook, faPencil} from "@fortawesome/free-solid-svg-icons";
import {faClock, faFaceGrinWide} from "@fortawesome/free-regular-svg-icons";
import ccImage from '../images/common/cc.svg'
import byImage from '../images/common/by.svg'
import ndImage from '../images/common/nd.svg'
import Toc from "../components/toc";
import SideBySide from '../components/side-by-side';
import MdxLink from '../components/mdx-link';
import {BlogPosting, WithContext} from "schema-dts";
import BlogSideNav from "../components/blog-side-nav";

const shortcodes = {
    Link,
    SideBySide,
    a: (props: any) => <MdxLink {...props} />
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
    const {
        subject,
        title,
        subtitle,
        images,
        tags,
        createdAt,
        createdAtStr,
        updatedAt,
        updatedAtStr,
    } = data.mdx!.frontmatter!

    const readMinutes = Math.ceil(data.mdx?.fields?.timeToRead?.minutes!)
    const canonical = siteUrl + path

    return (
        <Layout>

            <aside className="sidebar-left">
                <BlogSideNav subject={subject}></BlogSideNav>
            </aside>

            <article className="page">
                {images && images[0] && (
                    <div className="page-image">
                        {/*todo alt*/}
                        <GatsbyImage
                            image={images[0]?.childImageSharp?.gatsbyImageData!}
                            alt={``}/>
                    </div>
                )}

                <header className="page-header">
                    <h1 className="page-title">
                        {process.env.NODE_ENV != 'production' && !createdAt && '(미공개)'}
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="page-subtitle"> {subtitle}</p>
                    )}

                    <p className="post-meta">
                        <span className="date">
                            <FontAwesomeIcon icon={faClock}/>
                            최초 작성일:{' '}
                            <time dateTime={createdAt!}>
                                {createdAtStr}
                            </time>
                        </span>
                        {updatedAt && (
                            <span className="modified">
                                <FontAwesomeIcon icon={faPencil}/>
                                최종 수정일:{' '}
                                <time dateTime={updatedAt}>
                                    {updatedAtStr}
                                </time>
                            </span>
                        )}

                        <span className="reading-time" title="{{ page.content | number_of_words }} words">
                            <FontAwesomeIcon icon={faBook}/>
                            {readMinutes}분
                        </span>
                    </p>

                    {tags && (
                        <p className="tags sr-only">
                            {/*<p className="tags">*/}
                            Tags:
                            {
                                // todo Link to Tag page
                                tags.map((tag, index) => <a key={`tag-${index}`}>{tag}</a>)
                            }
                        </p>
                    )}
                </header>

                <div className="post-top-ad">
                    <GoogleAdsense layoutKey="-f9+5v+4m-d8+7b" slot="9726040265"/>
                </div>

                <div className="page-content">
                    <Toc toc={data.mdx?.tableOfContents!}/>

                    <MDXProvider components={shortcodes}>{children}</MDXProvider>
                </div>

                <footer className="page-footer">
                    <div className="sns-links">
                        <OutboundLink href={`https://www.facebook.com/sharer/sharer.php?u=${canonical}`}
                                      className="sns-link facebook" target="_blank" aria-label="facebook"
                                      onClick={() => gaEvent('sns-link-fb', 'click', canonical)}
                        >
                            <FontAwesomeIcon icon={faFacebookF}/><span className="sr-only">facebook</span>
                        </OutboundLink>
                        <OutboundLink href={`https://twitter.com/home?status=${canonical}`}
                                      className="sns-link twitter"
                                      target="_blank" aria-label="twitter"
                                      onClick={() => gaEvent('sns-link-tw', 'click', canonical)}
                        >
                            <FontAwesomeIcon icon={faTwitter}/><span className="sr-only">twitter</span>
                        </OutboundLink>
                    </div>

                    <div className="cc-info">
                        <img src={ccImage} alt="CC" className="cc-icon" width={20}/>
                        <img src={byImage} alt="BY" className="cc-icon" width={20}/>
                        <img src={ndImage} alt="ND" className="cc-icon" width={20}/>
                        <br/>
                        블로그 글의 내용은 <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.ko" target="_blank">크리에이티브
                        커먼즈 저작자표시-변경금지 4.0 국제 라이선스</a>에 따라 이용하실 수 있습니다.
                    </div>

                    <div className="post-nav">
                        {next && <Link to={`/blog/${next.frontmatter.slug}`}
                                       className="post-next-link"
                                       onClick={() => gaEvent('post-next-link', 'click', next.frontmatter.title)}>
                            {next.frontmatter.title}
                            <span className="icon">
                                <FontAwesomeIcon icon={faFaceGrinWide}/>
                                <FontAwesomeIcon icon={faArrowRightLong}/>
                            </span>
                        </Link>}
                        {previous && <Link to={`/blog/${previous.frontmatter.slug}`}
                                           className="post-prev-link"
                                           onClick={() => gaEvent('post-prev-link', 'click', previous.frontmatter.title!)}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faArrowLeftLong}/>
                                <FontAwesomeIcon icon={faFaceGrinWide}/>
                            </span>
                            {previous.frontmatter.title}
                        </Link>}
                    </div>
                </footer>

            </article>

            <aside className="sidebar-right"></aside>
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
                images {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                tags
                slug
                createdAt
                createdAtStr: createdAt(formatString: "LL", locale: "ko-KR")
                updatedAt
                updatedAtStr: updatedAt(formatString: "LL", locale: "ko-KR")
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

export const Head: HeadFC<Queries.PostPageQuery> = ({ data, location }) => {
    const meta = useSiteMetadata()
    const {
        title,
        subtitle,
        subject,
        excerpt,
        images,
        tags,
        createdAt,
        updatedAt,
    } = data.mdx!.frontmatter!

    const fullTitle = title + (subtitle && ` — ${subtitle}`) + ` | ${subject.title}`
    const imageUrls = (images || []).map(i => i?.publicURL!)

    // https://developers.google.com/search/docs/appearance/structured-data/article?hl=ko
    const schema: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: fullTitle!,
        image: imageUrls,
        datePublished: createdAt!,
        dateModified: updatedAt!,
        author: [
            {
                "@type": "Person",
                name: meta.author!,
                url: meta.siteUrl + '/about'
            },
        ],
        wordCount: data.mdx?.fields?.timeToRead?.words!,
        keywords: tags || undefined,
        isPartOf: {
            "@type": "Blog",
            name: meta.title + ' 블로그',
            url: meta.siteUrl + '/blog'
        },
    };

    return <SeoHead title={fullTitle}
                    description={excerpt}
                    image={imageUrls && imageUrls[0]}
                    pathname={location.pathname}
                    schema={schema}
    >
    </SeoHead>
}

export default PostPage
