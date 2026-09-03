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
    contentClassName?: string
}

const PageLayout: React.FC<Props> = ({children, frontmatter}) => {
    // SSR 결과에 isDesktop이 아닌 경우 포함됨.
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    return (
        <Layout>
            <article className="max-w-[680px] mx-auto px-10 mb-20 prose dark:prose-invert">

                <header className="mb-10">
                    <h1>{frontmatter.title}</h1>
                    {
                        frontmatter.subtitle && <p className="text-lg"> {frontmatter.subtitle}</p>
                    }
                    <PageMeta updatedAt={frontmatter.updatedAt}></PageMeta>
                </header>

                <div>
                    {children}
                </div>

            </article>

        </Layout>
    )
}


export default PageLayout
