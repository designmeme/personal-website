import type { GatsbyNode } from "gatsby"

const readingTime = require(`reading-time`)

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, createNodeId, getNode }) => {
    const { createNodeField, createNode, createParentChildLink } = actions
    if (node.internal.type === `Mdx`) {
        // MDX Subset 만들기 todo -> mdx transformr 를 거치기 전이라 tableOfContents 등 필드가 누락됨.
        // 참고: https://github.com/gatsbyjs/gatsby/discussions/34881
        // const parent = getNode(node.parent);
        // if (parent && parent.sourceInstanceName === "posts") {
        //     console.log('tableOfContents', node.tableOfContents)
        //     const nodeType = 'Mdx'
        //     createNode({
        //         ...node,
        //         id: createNodeId(`${nodeType}${node.id}`),
        //         // parent: node.id,
        //         internal: {
        //             type: nodeType,
        //             contentDigest: node.internal.contentDigest,
        //         },
        //     })
        //     createParentChildLink({
        //         parent: parent,
        //         child: node,
        //     });
        // }
        createNodeField({
            node,
            name: `timeToRead`,
            value: readingTime(node.body)
        })

        // File 노드의 sourceInstanceName 정보를 Mdx 노드에 추가한다.
        const { sourceInstanceName } = getNode(node.parent!)
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
                resolve: async (source, args, context, info) => {
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
                resolve: async (source, args, context, info) => {
                    const { entries } = await context.nodeModel.findAll({
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
