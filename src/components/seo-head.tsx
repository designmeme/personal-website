import React from "react"
import {useSiteMetadata} from "../hooks/use-site-metadata"
import {Script} from "gatsby";
import type {WithContext} from 'schema-dts';

type Props = {
    title?: string | null
    description?: string | null
    image?: string | null
    pathname?: string | null
    noindex?: boolean
    schema?: WithContext<any> | Array<WithContext<any>>
    children?: React.ReactNode
}

const SeoHead: React.FC<Props> = (
    {
        title,
        description,
        image,
        pathname,
        noindex = false,
        schema = [],
        children,
    }) => {
    const {
        title: siteTitle,
        description: siteDescription,
        image: siteImage,
        siteUrl,
        author,
        lang,
        locale,
        twitter,
        facebook,
        googleAdsense,
        webmaster_verifications,
    } = useSiteMetadata()

    const seo = {
        title: `${title == siteTitle ? title : title + " | " + siteTitle }`,
        description: description || siteDescription,
        image: siteUrl + (image || siteImage),
        url: siteUrl + (pathname || ''),
    }

    if (!Array.isArray(schema)) {
        schema = [schema]
    }
    // 이미지 url 이 상대경로인 경우 사이트 URL을 앞에 붙여준다.
    schema = schema.map((s: WithContext<any>) => {
        if (s?.image) {
            s.image = s.image.map((img: string) => img?.startsWith('http') ? img : siteUrl + img)
        }
        return s;
    })

    const articleSchema = schema.find((s: WithContext<any>) => s["@type"] === "BlogPosting")

    return (
        <>
            <html lang={lang}/>

            {/*검색엔진에서 페이지를 수집하지 않도록 설정: https://developers.google.com/search/docs/advanced/robots/robots_meta_tag?hl=ko#robotsmeta*/}
            {noindex && <meta name="robots" content="noindex, nofollow"/>}

            <title>{seo.title}</title>
            <meta property="og:title" content={seo.title}/>
            <meta name="twitter:title" content={seo.title}/>

            <meta property="og:site_name" content={siteTitle}/>

            {!articleSchema ? (
                <meta property="og:type" content="website"/>
            ) : (
                <>
                    <meta property="og:type" content="article"/>
                    <meta property="article:published_time" content={articleSchema.datePublished}/>
                    <meta property="article:modified_time" content={articleSchema.dateModified}/>
                    {articleSchema.author && articleSchema.author.length && <meta property="article:author" content={articleSchema.author[0].name}/>}
                </>
            )}

            {seo.description && (
                <>
                    <meta name="description" content={seo.description} />
                    <meta property="og:description" content={seo.description} />
                    <meta name="twitter:description" content={seo.description} />
                </>
            )}
            {seo.image ? (
                <>
                    <meta name="image" content={seo.image} />
                    <meta property="og:image" content={seo.image} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content={seo.image} />
                </>
            ) : (
                <meta name="twitter:card" content="summary" />
            )}
            {author && (
                <meta name="author" content={author} />
            )}
            {locale && (
                <meta property="og:locale" content={locale} />
            )}
            {seo.url && (
                <>
                    <link rel="canonical" href={seo.url} />
                    <meta property="og:url" content={seo.url} />
                    <meta name="twitter:url" content={seo.url} />
                </>
            )}
            {twitter?.username && (
                <meta name="twitter:creator" content={twitter?.username} />
            )}
            {facebook?.app_id && (
                <meta property="fb:app_id" content={facebook.app_id} />
            )}

            {webmaster_verifications?.google && (
                <meta name="google-site-verification" content={webmaster_verifications.google} />
            )}

            {/*https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-seo-component/#rich-snippets */}
            {/*https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=ko*/}
            {schema.length && <Script type="application/ld+json">{JSON.stringify(schema)}</Script>}

            {/*todo etc*/}
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FC4A1A"/>
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black"/>

            {children}
        </>
    )
}

export default SeoHead
