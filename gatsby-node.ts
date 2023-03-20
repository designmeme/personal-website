import type {GatsbyNode} from "gatsby"

const path = require(`path`)
const readingTime = require(`reading-time`)

export const createPages: GatsbyNode["createPages"] = async ({actions, graphql}) => {
    const {createPage} = actions

    // /src/posts/*.mdx 파일만 포스트 페이지를 생성한다.
    // /src/pages/blog/{mdx.frontmatter__slug}.mdx 파일시스템 API 사용시
    // /src/pages/design-guide.mdx 등 다른 경로의 파일도 모두 포스트 페이지로 생성하는 문제가 있음.
    // 참고: https://www.gatsbyjs.com/docs/how-to/routing/mdx/#create-pages-from-sourced-mdx-files
    const result: any = await graphql(`
        query CreatePostPages {
          allMdx(filter: {fields: {sourceInstanceName: {eq: "posts"}}}) {
            nodes {
              id
              frontmatter {
                slug
              }
              internal {
                contentFilePath
              }
            }
          }
        }
    `)

    const data: Queries.CreatePostPagesQuery = result.data

    data.allMdx.nodes.forEach(node => {
        createPage({
            path: `/blog/${node.frontmatter.slug}`,
            // __contentFilePath로 지정한 mdx 본문이 템플릿 페이지 안의 children으로 전달됨.
            component: `${path.resolve(`src/templates/post.tsx`)}?__contentFilePath=${node.internal.contentFilePath}`,
            context: {
                id: node.id
            },
            // https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#optimizing-pages-for-content-sync
            ownerNodeId: node.id,
        })
    })
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({node, actions, createNodeId, getNode}) => {
    const {createNodeField, createNode, createParentChildLink} = actions
    if (node.internal.type === `Mdx`) {
        // MDX Subset 만들기
        // 참고: https://github.com/gatsbyjs/gatsby/discussions/34881
        // const fileNode = getNode(node.parent!);
        // if (fileNode && fileNode.sourceInstanceName === "posts") {
        //     const nodeType = 'PostMdx'
        //     createNode({
        //         ...node,
        //         id: createNodeId(`${nodeType}${node.id}`),
        //         internal: {
        //             type: nodeType,
        //             // todo need createContentDigest ?
        //             contentDigest: node.internal.contentDigest,
        //         },
        //     })
        //     createParentChildLink({
        //         parent: fileNode,
        //         child: node,
        //     });
        // }

        createNodeField({
            node,
            name: `timeToRead`,
            value: readingTime(node.body)
        })

        // File 노드의 sourceInstanceName 정보를 Mdx 노드에 추가한다.
        // posts, pages 등 목적에 따른 Mdx를 구분하기 위해.
        // @ts-ignore
        const {sourceInstanceName} = getNode(node.parent!)
        createNodeField({
            node,
            name: `sourceInstanceName`,
            value: sourceInstanceName
        })
    }
}

// 스키마 명확히 정의하기
// 참고: https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#fixing-field-types
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions, schema }) => {
    const { createTypes } = actions
    // todo posts 에 sort 기능 넣을수 없나?
    const typeDefs = [`
        type Mdx implements Node {
            frontmatter: MdxFrontmatter!
        }
        type MdxFrontmatter @dontInfer {
            subject: SubjectJson! @link(by: "slug")
            slug: String!
            title: String!
            subtitle: String
            excerpt: String
            tags: [String!]
            images: [File!] @fileByRelativePath
            created_at: Date @dateformat
            updated_at: Date @dateformat
            order: Int
        }
        type SubjectJson implements Node @dontInfer {
            slug: String!
            title: String!
            sort: [String!]!
            posts: [Mdx!]! @link(by: "frontmatter.subject.slug", from: "slug")
        }
        `,
    ]
    createTypes(typeDefs)
}

export const createResolvers: GatsbyNode["createResolvers"] = ({ createResolvers }) => {
    const resolvers = {
        MdxFrontmatter: {
            order: {
                type: "Int",
                resolve: async (source: Queries.MdxFrontmatter, args, context, info) => {
                    // 주제별 포스트 순서값 지정 - SubjectJson 데이터를 기반으로 order 값을 반환한다.
                    if (!source.subject) {
                        return null
                    }
                    const subject = await context.nodeModel.findOne({
                        type: 'SubjectJson',
                        query: {filter: {slug: {eq: source.subject}}}
                    })
                    return subject.sort.indexOf(source.slug) + 1 || null
                },
            },
        },
        SubjectJson: {
            // type @link 지정만으로는 sort, limit 같은 쿼리를 사용할 수 없어서 추가함.
            posts: {
                type: "[Mdx!]!",
                resolve: async (source: Queries.SubjectJson, args, context, info) => {
                    const {entries} = await context.nodeModel.findAll({
                        type: 'Mdx',
                        query: {
                            filter: {frontmatter: {subject: {slug: {eq: source.slug}}}},
                            sort: {
                                fields: ["frontmatter.order"],
                                order: ["ASC"]
                            }
                        }
                    })
                    return entries
                },
            }
        }
    }
    createResolvers(resolvers)
}
