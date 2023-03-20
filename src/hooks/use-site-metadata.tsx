import {graphql, useStaticQuery} from "gatsby"

export const useSiteMetadata = () => {
    const data = useStaticQuery(graphql`
        query siteMetadata {
            site {
                siteMetadata {
                    title
                    description
                    image
                    siteUrl
                    author
                    email
                    lang
                    locale
                    copyright
                    github_username
                    twitter {
                        card
                        username
                    }
                    facebook {
                        app_id
                    }
                    googleAdsense
                    webmaster_verifications {
                        google
                    }
                }
            }
        }
    `)

    return data.site.siteMetadata
}
