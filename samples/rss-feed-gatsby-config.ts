import type {GatsbyConfig} from "gatsby";
import {getImage} from "gatsby-plugin-image";

const siteUrl: string = `https://heyjihye.com`
const title: string = `이지혜, 프론트엔드 웹 개발자`

const config: GatsbyConfig = {
    siteMetadata: {
        title,
        description: `Freelance Front-end Web Developer`,
        siteUrl,
        author: `이지혜`,
        email: `ghe.lee19@gmail.com`,
        lang: `ko`,
        categories: ['Tech', 'Web Dev', '웹개발', 'Programming', '개발블로그'],
        copyright: `© 2017-${(new Date()).getFullYear()} 이지혜 All rights reserved.`,
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "posts",
                "path": `./src/posts/`
            },
        },
        `gatsby-plugin-mdx`,
        {
            resolve: `gatsby-plugin-feed`,
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
                setup: ({query: {site: {siteMetadata}}, output, ...rest}) => ({
                    // 권장형식: username@hostname.tld (Real Name)
                    managingEditor: `${siteMetadata.email} (${siteMetadata.author})`,
                    webMaster: `${siteMetadata.email} (${siteMetadata.author})`,
                    feed_url: siteMetadata.siteUrl + output,  // atom:link 생성용
                    // todo icon image
                    // image_url: '',
                    ...siteMetadata,
                    ...rest,
                }),
                feeds: [
                    {
                        // 필수
                        // link 요소가 html head에 추가됨.
                        // <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="이지혜, 프론트엔드 웹 개발자">
                        output: "/rss.xml",

                        // 필수
                        title: "이지혜, 프론트엔드 웹 개발자",

                        // match: "^/blog/",

                        // 만들어진 /rss.xml 파일 대신 외부 주소를 사용해 link 요소가 html head에 추가됨.
                        // <link rel="alternate" type="application/rss+xml" href="https://feeds.feedburner.com/heyjihye/feed" title="이지혜, 프론트엔드 웹 개발자">
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
                        serialize: ({query: {site, allPostMdx}}) => allPostMdx.nodes.map(node => {
                            const image = getImage(node.frontmatter.image)
                            const imageSrc = image?.images.fallback?.src

                            // 블로그 포스트만 RSS 피드 아이템으로 생성한다.
                            return Object.assign({}, node.frontmatter, {
                                // item options: https://www.npmjs.com/package/rss#itemoptions
                                title: `${node.frontmatter.title} — ${node.frontmatter.subtitle}`,
                                description: node.excerpt,
                                // utm 정보 추가
                                url: `${site.siteMetadata!.siteUrl}/blog/${node.frontmatter.slug}/?utm_source=blog-feed&utm_medium=feed&utm_campaign=feed`,
                                guid: `blog-${node.frontmatter.slug}`,
                                custom_elements: [
                                    image && {
                                        'media:content': [
                                            {
                                                _attr: {
                                                    url: site.siteMetadata!.siteUrl! + imageSrc,
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
    ]
};

export default config;
