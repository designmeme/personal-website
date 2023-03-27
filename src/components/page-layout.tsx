import * as React from 'react'
import Layout from "./layout";


type Props = {
    title: string
    subtitle?: string
    children: React.ReactNode
}

const PageLayout: React.FC<Props> = ({children, title, subtitle}) => {
    return (
        <Layout>
            <aside className="sidebar-left"></aside>
            <article className="page">

                <header className="page-header">
                    <h1 className="page-title">{title}</h1>
                    {
                        subtitle && <p className="page-subtitle"> {subtitle}</p>
                    }
                </header>

                <div className="page-content">
                    {children}
                </div>

            </article>

            <aside className="sidebar-right"></aside>
        </Layout>
    )
}


export default PageLayout
