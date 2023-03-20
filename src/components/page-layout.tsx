import * as React from 'react'
import PropTypes from "prop-types";
import Layout from "./layout";


interface pageLayoutProps {
    title: string
    subtitle?: string
    children: React.ReactNode
}
const PageLayout: React.FC<pageLayoutProps> = ({children, title, subtitle}) => {
    return (
        <Layout>
            <div className="page">

                <header className="page-header">
                    <h1 className="page-title">{title}</h1>
                    {
                        subtitle && <p className="page-subtitle"> {subtitle}</p>
                    }
                </header>

                <div className="page-content">
                    {children}
                </div>

            </div>
        </Layout>
    )
}


export default PageLayout
