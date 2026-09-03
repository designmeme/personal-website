import * as React from 'react'
import {graphql, HeadFC, Link, PageProps} from 'gatsby'
import Layout from '../components/layout'
import SeoHead from '../components/seo-head'
import {GatsbyImage} from "gatsby-plugin-image";
import {useSiteMetadata} from "../hooks/use-site-metadata";
import {MDXProvider} from "@mdx-js/react"
import GoogleAdsense from "../components/google-adsense";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCreativeCommons,
    faCreativeCommonsBy,
    faCreativeCommonsNc,
    faCreativeCommonsNd,
} from "@fortawesome/free-brands-svg-icons";
import {faArrowLeftLong, faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {faFaceGrinWide} from "@fortawesome/free-regular-svg-icons";
import Toc from "../components/toc";
import {BlogPosting, BreadcrumbList, WithContext} from "schema-dts";
import BlogSideNav from "../components/blog-side-nav";
import {useMediaQuery} from 'react-responsive'
import PageMeta from "../components/page-meta";
import RssFeedInfo from "../components/rss-feed-info";
import {mdxComponents} from "../components/mdx-components";


type PageContextType = {
    id: String
    previous: Queries.Mdx | null
    next: Queries.Mdx | null
}


const PostPage: React.FC<PageProps<Queries.PostPageQuery, PageContextType>>
    = ({data, children, pageContext}) => {
    const {previous, next} = pageContext
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
    // SSR 결과에 isDesktop이 아닌 경우 포함됨.
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    return (
        <Layout>

            <div className="lg:flex mx-auto justify-center gap-[100px]">

                <aside className="hidden lg:block w-[300px]">
                    <BlogSideNav subject={subject}></BlogSideNav>
                </aside>

                <article className="min-w-0 max-w-none lg:max-w-[680px] prose dark:prose-invert mb-20">
                    <header className="mb-10">
                        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm mb-8">
                            <Link to={'/blog'} className="not-hover:text-secondary">블로그</Link>
                            <span className="text-muted">{'>'}</span>
                            <Link to={`/blog/#${subject.slug}`} className="not-hover:text-secondary">{subject.title}</Link>
                        </nav>

                        <h1>{title}</h1>

                        {subtitle && (
                            <p className="text-xl mb-6 -mt-4">{subtitle}</p>
                        )}

                        <PageMeta updatedAt={updatedAt} readMinutes={readMinutes} tags={tags} />

                    </header>

                    {/*{image && (*/}
                    {/*    <GatsbyImage*/}
                    {/*        class={'-mx-10 mb-10 md:-mx-20'}*/}
                    {/*        image={image.childImageSharp?.gatsbyImageData!}*/}
                    {/*        alt={`${title}${subtitle ? ` — ${subtitle}` : ''}`}/>*/}
                    {/*)}*/}

                    {/*{!isDesktop && <Toc toc={data.mdx?.tableOfContents!} title={title} useScrollActive={false}/>}*/}

                    <div className="mb-12">
                        {/*포스트 상단용(인피드)*/}
                        <GoogleAdsense layoutKey="-f9+5v+4m-d8+7b" slot="9726040265"/>
                    </div>

                    <MDXProvider components={mdxComponents}>{children}</MDXProvider>

                    <div className="my-12">
                        {/*포스트 하단용(디스플레이)*/}
                        <GoogleAdsense format="auto" slot="6926754782" responsive={true}/>
                    </div>

                    <footer className="mt-20">
                        <div className="text-xs bg-gray-100 dark:bg-gray-800 mb-20 p-6">
                            <div className="text-xl mb-2">
                                <FontAwesomeIcon className="cc-icon" icon={faCreativeCommons}/>
                                <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsBy}/>
                                <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsNc}/>
                                <FontAwesomeIcon className="cc-icon" icon={faCreativeCommonsNd}/>
                            </div>
                            <div className="text-secondary">
                                블로그 글의 내용은 <a className="text-inherit" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ko" target="_blank" rel="nofollow">크리에이티브
                                커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스</a>에 따라 이용하실 수 있습니다.
                            </div>
                        </div>

                        <div className="text-lg flex flex-row gap-4 justify-between flex-wrap">
                            {previous && <div className="grow"><Link to={`/blog/${previous.frontmatter.slug}`}>
                                <span className="text-xl mr-2">
                                    <FontAwesomeIcon icon={faArrowLeftLong}/>
                                    <FontAwesomeIcon icon={faFaceGrinWide}/>
                                </span>
                                {previous.frontmatter.title}
                            </Link></div>}
                            {next && <div className="text-right grow">
                                <Link to={`/blog/${next.frontmatter.slug}`}>
                                {next.frontmatter.title}
                                <span className="text-xl ml-2">
                                    <FontAwesomeIcon icon={faFaceGrinWide}/>
                                    <FontAwesomeIcon icon={faArrowRightLong}/>
                                </span>
                            </Link></div>}
                        </div>

                    </footer>

                </article>

                <aside className="hidden 2xl:block w-[280px] shrink-0">
                    <div className="sticky top-[50px] h-[calc(100vh-100px)] overflow-y-auto">
                        <Toc toc={data.mdx?.tableOfContents!} title={title}/>
                        <RssFeedInfo/>
                    </div>
                </aside>
            </div>
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
