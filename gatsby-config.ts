import type {GatsbyConfig} from "gatsby";

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})

const config: GatsbyConfig = {
    siteMetadata: {
        title: `이지혜, 프론트엔드 웹 개발자`,
        description: `Freelance Front-end Web Developer`,
        image: `/images/common/feature.png`,
        siteUrl: `https://heyjihye.com`,
        author: `이지혜 Lee Jihye`,
        email: `ghe.lee19@gmail.com`,
        lang: `ko`,
        locale: `ko_KR`,
        github_username: `designmeme`,
        copyright: `© Lee Jihye`,
        twitter: {
            card: `summary`,
            username: ``,
        },
        facebook: {
            app_id: `127116027879734`
        },
        googleAdsense: `ca-pub-3088246349891349`,
        webmaster_verifications: {
            google: `google2bfa19f4f3a8a8ee`,
        }
    },
    // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
    // If you use VSCode you can also use the GraphQL plugin
    // Learn more at: https://gatsby.dev/graphql-typegen
    graphqlTypegen: true,
    // todo 참고 https://github.com/tdudkowski/gatsby-homepage4/blob/main/gatsby-config.mjs
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/pages/"
            },
            __key: "pages"
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "posts",
                "path": `./src/posts/`
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "data",
                "path": `./src/data/`
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                sassOptions: {
                    includePaths: ["src/styles"],
                },
            },
        },
        // production build 에서 첫 사이트 진입시 fontawesome 아이콘이 매우 크게 표시된 후 작아지는 문제 해결용.
        // https://www.gatsbyjs.com/plugins/gatsby-plugin-fontawesome-css/
        `gatsby-plugin-fontawesome-css`,
        {
            resolve: "gatsby-plugin-google-gtag",
            options: {
                trackingIds: [`G-FNDEZBX8ME`]
            }
        },
        {
            resolve: 'gatsby-plugin-sitemap',
            options: {
                // TypeGen 적용 안됨.
                query: `query Sitemap {
                  site {
                    siteMetadata {
                      siteUrl
                    }
                  }
                  allSitePage {
                    nodes {
                      path
                    }
                  }
                  allPostMdx: allMdx(filter: {fields: {sourceInstanceName: {eq: "posts"}}}) {
                    nodes {
                      frontmatter {
                        updatedAt
                        slug
                      }
                    }
                  }
                  allPageMdx: allMdx(filter: {fields: {sourceInstanceName: {eq: "pages"}}}) {
                    nodes {
                      frontmatter {
                        updatedAt
                      }
                      parent {
                        ... on File {
                          absolutePath
                        }
                      }
                    }
                  }
                  allJavascriptFrontmatter {
                    nodes {
                      frontmatter {
                        updatedAt
                      }
                      fileAbsolutePath
                    }
                  }
                }`,
                // @ts-ignore
                resolvePages: ({allSitePage, allPostMdx, allPageMdx, allJavascriptFrontmatter}) => {
                    return allSitePage.nodes.map((page: Queries.SitePage) => {
                        const path = page.path
                        let lastmod

                        if (path.match(/\/blog\/.+/)) {
                            // blog post: path ex) /blog/sass-data-types/
                            const slug = path.slice(6, -1)
                            const post = allPostMdx.nodes.find((node: Queries.Mdx) => node.frontmatter.slug == slug)
                            lastmod = post?.frontmatter.updatedAt || undefined
                        } else {
                            const re = /\/src\/pages(\/.*)\.\w*$/
                            // pages - mdx
                            const pageMdx = allPageMdx.nodes.find((node: Queries.Mdx) => {
                                // @ts-ignore
                                return path == node.parent?.absolutePath.match(re)[1].replace(/\/index$/, "") + '/'
                            })
                            lastmod = pageMdx?.frontmatter.updatedAt || undefined

                            // pages - jsx, tsx
                            if (!pageMdx) {
                                const page = allJavascriptFrontmatter.nodes.find((node: Queries.JavascriptFrontmatter) => {
                                    // @ts-ignore
                                    return path == node.fileAbsolutePath.match(re)[1].replace(/\/index$/, "") + '/'
                                })
                                lastmod = page?.frontmatter.updatedAt || undefined
                            }
                        }

                        return {path, lastmod}
                    })
                },
                serialize: (props: { path: string, lastmod: string | undefined }) => {
                    return {
                        url: props.path,
                        lastmod: props.lastmod
                    }
                },
                createLinkInHead: true,
            }
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                policy: [{userAgent: '*', allow: '/'}]
            }
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/favicon/favicon.png"
            }
        },
        `gatsby-transformer-javascript-frontmatter`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`, `.md`],
                gatsbyRemarkPlugins: [
                    // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // bug: showLineNumbers: true 설정후 mdx 에서 개별적으로 numberLines: false 설정해도 계속 숫자가 생김.
                            // {numberLines: true} or {numberLines: 10}
                            showLineNumbers: false,
                        }
                    },
                    // https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                            offsetY: `50`,
                        }
                    },
                    // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=gatsby-remark-images
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // maxWidth: 900,
                            showCaptions: true,
                            backgroundColor: false,
                            quality: 80,
                            tracedSVG: true,
                            // not working todo fix - 이미지 비율대로 박스 만들어서 로딩시 점프 없애기
                            // @ts-ignore
                            wrapperStyle: fluidResult => `flex:${Math.round(fluidResult.aspectRatio * 100) / 100};`,
                        },
                    },
                ],
                mdxOptions: {
                    remarkPlugins: [
                        // Add GitHub Flavored Markdown (GFM) support
                        // v1 사용 - 참고 https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx#mdxoptions
                        require(`remark-gfm`),
                        // v3 사용 - remark-gfm v1 사용시 footnote 만 미지원해서 추가로 설치함.
                        require(`remark-footnotes`),
                    ],
                },
            },
        },
        "gatsby-plugin-image",
        {
            resolve: `gatsby-plugin-sharp`,
            // options: {
            //     defaults: {
            //         formats: [`auto`, `webp`],
            //         placeholder: `dominantColor`,
            //         quality: 50,
            //         breakpoints: [750, 1080, 1366, 1920],
            //         backgroundColor: `transparent`,
            //         blurredOptions: {},
            //         jpgOptions: {},
            //         pngOptions: {},
            //         webpOptions: {},
            //         avifOptions: {},
            //     },
            // },
        },
        "gatsby-transformer-sharp",
        `gatsby-transformer-json`,
    ]
};

export default config;
