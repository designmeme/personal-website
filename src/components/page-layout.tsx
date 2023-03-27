import * as React from 'react'
import Layout from "./layout";
import PageMeta from "./page-meta";
import MediaQuery from "react-responsive";


type Props = {
    frontmatter: Queries.JavascriptFrontmatterFrontmatter
    children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({children, frontmatter}) => {
    return (
        <Layout>
            <aside className="sidebar-left"></aside>
            <article className="page">

                <header className="page-header">
                    <h1 className="page-title">{frontmatter.title}</h1>
                    {
                        frontmatter.subtitle && <p className="page-subtitle"> {frontmatter.subtitle}</p>
                    }

                    <MediaQuery maxWidth={800}>
                        <PageMeta createdAt={frontmatter.createdAt} updatedAt={frontmatter.updatedAt}></PageMeta>
                    </MediaQuery>
                </header>

                <div className="page-content">
                    {children}
                </div>

            </article>

            <aside className="sidebar-right">
                <MediaQuery minWidth={801}>
                    <PageMeta createdAt={frontmatter.createdAt} updatedAt={frontmatter.updatedAt}></PageMeta>
                </MediaQuery>
            </aside>
        </Layout>
    )
}


export default PageLayout
