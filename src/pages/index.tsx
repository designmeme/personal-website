import * as React from "react"
import type {HeadFC, PageProps} from "gatsby"
import {Link} from 'gatsby';
import Layout from '../components/layout';
import {StaticImage} from 'gatsby-plugin-image';
import Seo from '../components/seo'


const IndexPage: React.FC<PageProps> = ({path, uri}) => {
    return (
        <Layout>
            <p>I'm making this by following the Gatsby Tutorial.</p>
            path: {path} <br/>
            uri: {uri} <br/>
            <StaticImage
                alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
                src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
            />
        </Layout>
    )
}

export default IndexPage

export const Head: HeadFC = ({location}) =>
    <Seo pathname={location.pathname} />

