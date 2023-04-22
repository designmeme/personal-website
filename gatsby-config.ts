import type {GatsbyConfig} from "gatsby";
import {getImage} from "gatsby-plugin-image";

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})

const siteUrl: string = `https://heyjihye.com`
const title: string = `이지혜, 프론트엔드 웹 개발자`

const config: GatsbyConfig = {
    siteMetadata: {
        title,
        description: `Freelance Front-end Web Developer`,
        image: `/images/common/feature.png`,
        siteUrl,
        author: `이지혜`,
        email: `ghe.lee19@gmail.com`,
        lang: `ko`,
        locale: `ko_KR`,
        // rss feed 카테고리로 사용됨.
        categories: ['Tech', 'Web Dev', '웹개발', 'Programming', '개발블로그'],
        github_username: `designmeme`,
        copyright: `© 2017-${(new Date()).getFullYear()} 이지혜 All rights reserved.`,
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
        // https://www.gatsbyjs.com/plugins/gatsby-plugin-feed/
        {
            resolve: `gatsby-plugin-feed`,
            // defaultOptions https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-feed/src/internals.js
            options: {
                query: `
                  {
                    site {
                      siteMetadata {
                        description
                        siteUrl
                        categories
                        copyright
                        email
                        author
                        language: lang
                      }
                    }
                  }
                `,
                // @ts-ignore
                setup: ({query: {site: {siteMetadata}}, ...feed}) => ({
                    // 권장형식: username@hostname.tld (Real Name)
                    managingEditor: `${siteMetadata.email} (${siteMetadata.author})`,
                    webMaster: `${siteMetadata.email} (${siteMetadata.author})`,
                    feed_url: siteMetadata.siteUrl + feed.output,  // atom:link 생성용
                    // todo icon image
                    // image_url: '',
                    ...siteMetadata,
                    ...feed,
                }),
                feeds: [
                    {
                        output: "/rss.xml",
                        title,
                        // link: "https://feeds.feedburner.com/heyjihye/feed",

                        // feed options: https://www.npmjs.com/package/rss#feedoptions
                        site_url: `${siteUrl}/blog/?utm_source=blog-feed&utm_medium=feed&utm_campaign=feed`,
                        // 기본 네임스페이스(atom, content, dc) 외 추가할 네임스페이스
                        custom_namespaces: {
                            'creativeCommons': 'http://backend.userland.com/creativeCommonsRssModule',
                            'media': 'http://search.yahoo.com/mrss/',
                        },
                        custom_elements: [
                            {'creativeCommons:license': 'https://creativecommons.org/licenses/by-nc-nd/4.0/'},
                        ],
                        query: `
                          {
                            allPostMdx: allMdx(
                              sort: {frontmatter: {createdAt: DESC}},
                              filter: {fields: {sourceInstanceName: {eq: "posts"}}},
                              limit: 1000,
                            ) {
                              nodes {
                                excerpt(pruneLength: 400)
                                frontmatter {
                                  slug
                                  title
                                  subtitle
                                  categories
                                  date: createdAt
                                  image {
                                    childImageSharp {
                                        gatsbyImageData(layout: FIXED, width: 1200, formats: [WEBP])
                                    }
                                  }
                                }
                              }
                            }
                          }
                        `,
                        // @ts-ignore
                        serialize: ({query: {site: {siteMetadata}, allPostMdx}}) => allPostMdx.nodes.map(node => {
                            const image = getImage(node.frontmatter.image)
                            const imageSrc = image?.images.fallback?.src

                            // 블로그 포스트만 RSS 피드 아이템으로 생성한다.
                            return Object.assign({}, node.frontmatter, {
                                // item options: https://www.npmjs.com/package/rss#itemoptions
                                title: `${node.frontmatter.title} — ${node.frontmatter.subtitle}`,
                                description: node.excerpt,
                                url: `${siteMetadata.siteUrl}/blog/${node.frontmatter.slug}/?utm_source=blog-feed&utm_medium=feed&utm_campaign=feed`,
                                // url 이 바뀌어도 guid 형식은 바뀌면 안됨.
                                // - node.id 를 사용할 수 없음. 참고) https://github.com/gatsbyjs/gatsby/issues/19323
                                guid: `blog-${node.frontmatter.slug}`,
                                custom_elements: [
                                    image && {
                                        'media:content': [
                                            {
                                                _attr: {
                                                    url: siteMetadata.siteUrl! + imageSrc,
                                                    type: `image/webp`,
                                                    width: image.width,
                                                    height: image.height,
                                                }
                                            }, {
                                                'media:title': [{_attr: {type: 'plain'}}, `<![CDATA[ ${node.frontmatter.title} ]]>`]
                                            }
                                        ]
                                    },
                                ],
                            });
                        }),
                    }
                ]
            }
        },
        `gatsby-transformer-javascript-frontmatter`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.mdx`],
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
                            // 로딩시에만 적용됨. ToC에서 링크 클릭시에는 offset 없음.
                            offsetY: `50`,
                        }
                    },
                    // https://www.gatsbyjs.com/plugins/gatsby-remark-images/?=gatsby-remark-images
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 600,  // 포스트 본문 최대 너비
                            showCaptions: true,
                            backgroundColor: 'none',
                            quality: 100,
                            withWebp: {quality: 100},
                            srcSetBreakpoints: [600],
                            // 이미지 비율대로 박스 만들어서 로딩시 점프 없애기 - MdxFixSpan 컴포넌트 필수.
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
            // https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image#image-options
            options: {
                defaults: {
                    placeholder: 'none',  // 대신 css로 처리
                    formats: [`auto`, `webp`],
                    quality: 100,
                    breakpoints: [800, 1024, 1280],
                },
            },
        },
        "gatsby-transformer-sharp",
        `gatsby-transformer-json`,
    ]
};

export default config;
