import * as React from 'react'
import Layout from "./layout";
import PageMeta from "./page-meta";
import {useMediaQuery} from "react-responsive";

export type PageFrontmatter = {
    title: string
    subtitle?: string
    excerpt?: string
    updatedAt?: string
    createdAt?: string
}

type Props = {
    frontmatter: PageFrontmatter
    children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({children, frontmatter}) => {
    // SSR 결과에 isDesktop이 아닌 경우 포함됨.
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    return (
        <Layout>
            <aside className="sidebar-left"></aside>
            <article className="page">

                <header className="page-header">
                    <h1 className="page-title">{frontmatter.title}</h1>
                    {
                        frontmatter.subtitle && <p className="page-subtitle"> {frontmatter.subtitle}</p>
                    }

                    {!isDesktop &&
                        <PageMeta createdAt={frontmatter.createdAt} updatedAt={frontmatter.updatedAt}></PageMeta>}
                </header>

                <div className="page-content">
                    {children}
                </div>

            </article>

            <aside className="sidebar-right">
                {isDesktop && <PageMeta createdAt={frontmatter.createdAt} updatedAt={frontmatter.updatedAt}></PageMeta>}
            </aside>
        </Layout>
    )
}


export default PageLayout
